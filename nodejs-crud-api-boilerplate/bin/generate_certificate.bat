@echo off

set OPENSSL_CONF=C:\Users\okpalan\Projects\www\okpalan.dev\okpalan.dev\server\bin/openssl.cnf

set KEY_FILE=key.pem
set CERT_FILE=cert.pem

openssl req -x509 -newkey rsa:4096 -keyout %KEY_FILE% -out %CERT_FILE% -days 365 -nodes

echo Key and certificate generated successfully.