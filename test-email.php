<?php
// Script de test et diagnostic email pour Cloudways
echo "<h2>🔍 Diagnostic Email - 3dassistance.fr</h2>";

// 1. Test de la fonction mail()
echo "<h3>1. Test fonction mail()</h3>";
$test_subject = "Test Email - " . date('Y-m-d H:i');
$test_message = "Ceci est un email de test depuis 3dassistance.fr\n\nEnvoyé le: " . date('Y-m-d H:i:s');
$test_headers = "From: noreply@3dassistance.fr\r\nReply-To: contact@3dassistance.fr\r\n";

$mail_result = mail('contact@3dassistance.fr', $test_subject, $test_message, $test_headers);

if ($mail_result) {
    echo "✅ Fonction mail() : <strong>OK</strong><br>";
} else {
    echo "❌ Fonction mail() : <strong>ÉCHEC</strong><br>";
}

// 2. Configuration serveur
echo "<h3>2. Configuration serveur</h3>";
echo "📧 Sendmail path: " . ini_get('sendmail_path') . "<br>";
echo "📧 SMTP: " . ini_get('SMTP') . "<br>";
echo "📧 SMTP Port: " . ini_get('smtp_port') . "<br>";
echo "📧 Mail fonction disponible: " . (function_exists('mail') ? '✅ OUI' : '❌ NON') . "<br>";

// 3. Headers recommandés
echo "<h3>3. Headers recommandés</h3>";
$recommended_headers = [
    'From: "3D Assistance" <noreply@3dassistance.fr>',
    'Reply-To: contact@3dassistance.fr',
    'Return-Path: noreply@3dassistance.fr',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
];

foreach ($recommended_headers as $header) {
    echo "📧 " . htmlspecialchars($header) . "<br>";
}

// 4. Test avec headers améliorés
echo "<h3>4. Test avec headers améliorés</h3>";

$enhanced_subject = "Test Email Amélioré - " . date('H:i');
$enhanced_message = "
<html>
<head><title>Test Email</title></head>
<body>
<h2>Test Email depuis 3dassistance.fr</h2>
<p>Ceci est un test avec headers améliorés.</p>
<p>Envoyé le: " . date('Y-m-d H:i:s') . "</p>
</body>
</html>
";

$enhanced_headers = implode("\r\n", [
    'From: "3D Assistance Test" <noreply@3dassistance.fr>',
    'Reply-To: contact@3dassistance.fr',
    'Return-Path: noreply@3dassistance.fr',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'X-Priority: 1',
    'Importance: High'
]);

$enhanced_result = mail('contact@3dassistance.fr', $enhanced_subject, $enhanced_message, $enhanced_headers);

if ($enhanced_result) {
    echo "✅ Email amélioré : <strong>ENVOYÉ</strong><br>";
} else {
    echo "❌ Email amélioré : <strong>ÉCHEC</strong><br>";
}

// 5. Vérification DNS
echo "<h3>5. Vérification DNS</h3>";
$mx_records = [];
if (getmxrr('3dassistance.fr', $mx_records)) {
    echo "✅ Enregistrements MX trouvés:<br>";
    foreach ($mx_records as $mx) {
        echo "📧 " . $mx . "<br>";
    }
} else {
    echo "❌ Aucun enregistrement MX trouvé pour 3dassistance.fr<br>";
}

// 6. Test de connectivité SMTP
echo "<h3>6. Test connectivité SMTP</h3>";
$smtp_test = fsockopen('localhost', 25, $errno, $errstr, 10);
if ($smtp_test) {
    echo "✅ Connexion SMTP locale : <strong>OK</strong><br>";
    fclose($smtp_test);
} else {
    echo "❌ Connexion SMTP locale : <strong>ÉCHEC</strong> ($errno: $errstr)<br>";
}

// 7. Logs d'erreur
echo "<h3>7. Vérification des logs</h3>";
$log_file = ini_get('error_log');
if ($log_file && file_exists($log_file)) {
    echo "📁 Fichier de log : " . $log_file . "<br>";
    $log_lines = array_slice(file($log_file), -10);
    echo "📄 Dernières lignes :<br><pre>" . implode('', $log_lines) . "</pre>";
} else {
    echo "⚠️ Fichier de log non trouvé<br>";
}

// 8. Recommandations
echo "<h3>8. Recommandations</h3>";
echo "
<div style='background: #f0f8ff; padding: 15px; border-left: 4px solid #1FA77D;'>
<strong>📋 Recommandations pour améliorer la délivrabilité :</strong><br><br>
1. ✅ Utiliser un domaine expéditeur valide (noreply@3dassistance.fr)<br>
2. ✅ Configurer les enregistrements SPF et DKIM<br>
3. ✅ Utiliser des headers complets<br>
4. ✅ Éviter les mots-clés spam<br>
5. ✅ Tester avec différents fournisseurs email<br>
6. 🔧 Considérer un service SMTP transactionnel (SendGrid, Mailgun)<br>
</div>
";

echo "<br><p><strong>Test terminé le " . date('Y-m-d H:i:s') . "</strong></p>";
?>