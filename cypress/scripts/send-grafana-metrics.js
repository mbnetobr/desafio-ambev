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

    const metricsPayload = "serverest_tests_total{environment=\"ci\"} " + totalTests + "\n" +
                           "serverest_tests_passed{environment=\"ci\"} " + totalPassed + "\n" +
                           "serverest_tests_failures{environment=\"ci\"} " + totalFailures;

    const rawUrl = process.env.GRAFANA_URL || "";
    const rawToken = process.env.GRAFANA_TOKEN || "";

    // Mantém estritamente apenas caracteres válidos para URLs (Remove quebras de linha, espaços, aspas e lixo de secrets)
    const grafanaUrl = (rawUrl.match(/https?:\/\/[^\s"'`<>]+/g) || [rawUrl])[0].trim();
    const token = rawToken.replace(/[\r\n\s"'`<>]/g, "").trim();

    console.log("URL tratada com sucesso. Comprimento final:", grafanaUrl.length);

    if (!grafanaUrl || !token) {
      console.log("Credenciais do Grafana ausentes ou vazias. Pulando envio.");
      return;
    }

    console.log("Enviando metricas para o endpoint do Prometheus Remote Write...");
    
    const response = await fetch(grafanaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Authorization": "Bearer " + token
      },
      body: metricsPayload
    });

    if (response.ok) {
      console.log("Metricas enviadas com sucesso para o Grafana Cloud!");
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