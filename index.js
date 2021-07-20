const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello azher rrrkhaode!\n'
  a1();
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});

//////////////////////////////npm 
var jose = require("node-jose");
const {JWS} = require("node-jose");
const zlib = require("zlib");


async function a1(){
 
	try {
	const keystore1 = [
  {
    kty: 'EC',
    kid: '6d858102402dbbeb0f9bb711e3d13a1229684792db4940db0d0e71c08ca602e1',
    use: 'sig',
	alg:'ES256',
	zip: 'DEF',
	 crv: "P-256",
    x  : "SVqB4JcUD6lsfvqMr-OKUNUphdNn64Eay60978ZlL74",
    y  : "lf0u0pMj4lGAzZix5u4Cm5CMQIgMNpkwy163wtKYVKI",
    d  : "0g5vAEKzugrXaRbgKG0Tj2qJ5lMP4Bezds1_sTybkfk"
  }
]

const keystore={
    keys: [
        {
            kty: 'EC',
            d: 'gLkNmSBFWR67hEu62eVfVWhFbLGl309jOszsocqbexE',
            use: 'sig',
            crv: 'P-256',
            kid: 'a7qE0Y0DyqeOFFREIQSLKfu5WlbckdxVXKFasfcI-Dg',
            x: '5R2yrryD1ztBYnyKyQF5r5kzPUjnVnmR5pMe7H9ykNU',
            y: 'VaqqjG0N2rSuijP9P9QiOjX4XEhIl8k8fzA6FZTSMhY',
            alg: 'ES256'
        }
    ]
}


	console.log('hi1');
	const ks = await jose.JWK.asKeyStore(keystore);
const encryptionKey= ks.get(keystore.keys[0].kid);
const rawKey = ks.get(keystore.keys[0].kid)
console.log('hi2');
console.log('raw',rawKey);
const key =  await jose.JWK.asKey(rawKey);
var keys = JSON.parse(JSON.stringify(key));

console.log('before create sign');
const jwks = JSON.stringify(keystore);
console.log(jwks);
	const payload =JSON.stringify({  "iss" : "https://spec.smarthealth.cards/examples/issuer", "nbf" : 342613,  "vc" : {    "type" : [ "https://smarthealth.cards#health-card", "https://smarthealth.cards#laboratory", "https://smarthealth.cards#covid19" ],    "credentialSubject" : {      "fhirVersion" : "4.0.1",      "fhirBundle" : {        "resourceType" : "Bundle",        "type" : "collection",        "entry" : [ {          "fullUrl" : "resource:0",          "resource" : {            "resourceType" : "Patient",            "name" : [ {              "family" : "Anyperson",              "given" : [ "TEST", "priyanka mane" ]            } ],            "birthDate" : "1990-01-03"          }        }, {          "fullUrl" : "resource:1",          "resource" : {            "resourceType" : "Observation",            "meta" : {              "security" : [ {                "system" : "https://smarthealth.cards/ial",                "code" : "IAL2"              } ]            },            "status" : "final",            "code" : {              "coding" : [ {                "system" : "http://loinc.org",                "code" : "94558-4"              } ]            },            "subject" : {              "reference" : "resource:0"            },            "effectiveDateTime" : "2021-06-02T08:25:00.000-07:00",            "valueCodeableConcept" : {              "coding" : [ {                "system" : "http://snomed.info/sct",                "code" : "260373001"              } ]            },            "performer" : [ {              "display" : "ABC General Hospital"            } ]          }        } ]      }    }  }});

const payloadBuf = zlib.deflateRawSync(payload);
	console.log(payload);
	//const token =await JWS.createSign({alg: "ES256",zip:"DEF", format: 'compact'}, key1).update(payload, 'utf8').final();
	//const token =await jose.JWS.createSign( {alg: "ES256",zip:"DEF",format: 'compact'},encryptionKey).update(payload, "utf8").final();
	const token =await jose.JWS.createSign( {alg: 'ES256', fields: { zip: 'DEF' },format: 'compact'},key).update(payloadBuf, "utf8").final();
console.log('hi3');
	console.log('it is return token--'+token);
  
	}catch (err) {
    console.log(err);
  }
	
}
a1();






