const fs = require("fs");
const path = require("path");

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(file => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (file.endsWith(".xml")) {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
}

async function run() {
  try {
    const xmlFiles = getAllFiles("all-artifacts");
    console.log("Encontrados " + xmlFiles.length + " relatorios JUnit XML.");
    
    let totalTests = 0;
    let totalFailures = 0;

    xmlFiles.forEach(file => {
      const content = fs.readFileSync(file, "utf8");
      const testsMatch = content.match(/tests="(\d+)"/);
      const failuresMatch = content.match(/failures="(\d+)"/);
      
      if (testsMatch) totalTests += parseInt(testsMatch[1], 10);
      if (failuresMatch) totalFailures += parseInt(failuresMatch[1], 10);
    });

    const totalPassed = totalTests - totalFailures;
    console.log("Metricas consolidadas -> Testes: " + totalTests + ", Sucessos: " + totalPassed + ", Falhas: " + totalFailures);

    const nowNano = Date.now() * 1000000;

    const otlpPayload = {
      resourceMetrics: [
        {
          scopeMetrics: [
            {
              metrics: [
                {
                  name: "serverest_tests_total",
                  description: "Total de testes executados na CI",
                  unit: "1",
                  gauge: {
                    dataPoints: [{ asInt: totalTests, timeUnixNano: nowNano, attributes: [{ key: "environment", value: { stringValue: "ci" } }] }]
                  }
                },
                {
                  name: "serverest_tests_passed",
                  description: "Total de testes com sucesso na CI",
                  unit: "1",
                  gauge: {
                    dataPoints: [{ asInt: totalPassed, timeUnixNano: nowNano, attributes: [{ key: "environment", value: { stringValue: "ci" } }] }]
                  }
                },
                {
                  name: "serverest_tests_failures",
                  description: "Total de falhas nos testes na CI",
                  unit: "1",
                  gauge: {
                    dataPoints: [{ asInt: totalFailures, timeUnixNano: nowNano, attributes: [{ key: "environment", value: { stringValue: "ci" } }] }]
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    const endpointUrl = "https://otlp-gateway-prod-sa-east-1.grafana.net/otlp/v1/metrics";
    const apiKey = process.env.GRAFANA_TOKEN || "";
    // O Grafana OTLP aceita autenticação básica onde o usuário é o ID (1819630) e a senha é o token glc_...
    const credentials = Buffer.from(`1819630:${apiKey}`).toString("base64");

    console.log("Enviando metricas OTLP para o Grafana Cloud...");
    
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`
      },
      body: JSON.stringify(otlpPayload)
    });

    if (response.ok) {
      console.log("Metricas OTLP enviadas com sucesso para o Grafana Cloud!");
    } else {
      const errorText = await response.text();
      console.warn("Aviso ao enviar metricas:", response.status, errorText);
    }

  } catch (error) {
    console.error("Erro ao processar relatorios para o Grafana:", error);
    process.exit(1);
  }
}

run();