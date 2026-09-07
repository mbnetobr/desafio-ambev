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
    console.log("Encontrados " + xmlFiles.length + " relatórios JUnit XML.");
    
    let totalTests = 0;
    let totalFailures = 0;

    xmlFiles.forEach(file => {
      const content = fs.readFileSync(file, "utf8");
      const rootTagMatch = content.match(/<testsuites[^>]*>/);
      
      if (rootTagMatch) {
        const rootTag = rootTagMatch[0];
        const testsMatch = rootTag.match(/tests="(\d+)"/);
        const failuresMatch = rootTag.match(/failures="(\d+)"/);
        
        if (testsMatch) totalTests += parseInt(testsMatch[1], 10);
        if (failuresMatch) totalFailures += parseInt(failuresMatch[1], 10);
      }
    });

    const totalPassed = totalTests - totalFailures;
    console.log("Métricas consolidadas -> Testes: " + totalTests + ", Sucessos: " + totalPassed + ", Falhas: " + totalFailures);

    const nowNano = Date.now() * 1000000;
    const runId = process.env.GITHUB_RUN_ID || "execucao_local";

    const commonAttributes = [
      { key: "environment", value: { stringValue: "ci" } },
      { key: "run_id", value: { stringValue: runId } }
    ];

    const otlpPayload = {
      resourceMetrics: [
        {
          scopeMetrics: [
            {
              metrics: [
                {
                  name: "serverest_tests_total_count",
                  description: "Total de testes executados na CI",
                  unit: "{tests}",
                  gauge: {
                    dataPoints: [{ asInt: totalTests, timeUnixNano: nowNano, attributes: commonAttributes }]
                  }
                },
                {
                  name: "serverest_tests_passed_count",
                  description: "Total de testes com sucesso na CI",
                  unit: "{tests}",
                  gauge: {
                    dataPoints: [{ asInt: totalPassed, timeUnixNano: nowNano, attributes: commonAttributes }]
                  }
                },
                {
                  name: "serverest_tests_failures_count",
                  description: "Total de falhas nos testes na CI",
                  unit: "{tests}",
                  gauge: {
                    dataPoints: [{ asInt: totalFailures, timeUnixNano: nowNano, attributes: commonAttributes }]
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
    const credentials = Buffer.from(`1819630:${apiKey}`).toString("base64");

    console.log("Enviando métricas OTLP com run_id para o Grafana Cloud...");
    
    const response = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`
      },
      body: JSON.stringify(otlpPayload)
    });

    if (response.ok) {
      console.log("Métricas OTLP enviadas com sucesso!");
    } else {
      const errorText = await response.text();
      console.warn("Aviso ao enviar métricas:", response.status, errorText);
    }

  } catch (error) {
    console.error("Erro ao processar relatórios para o Grafana:", error);
    process.exit(1);
  }
}

run();