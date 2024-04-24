import bigInt from "big-integer";
// Hàm tính ước chung lớn nhất (GCD) của hai số
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Hàm tìm số nguyên tố ngẫu nhiên
function randomPrime(min, max) {
  const primes = [];
  for (let i = min; i <= max; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }
  return primes[Math.floor(Math.random() * primes.length)];
}

// Hàm tạo cặp khóa RSA
function generateKeyPair() {
  const p = randomPrime(50, 100); // Thay đổi phạm vi số nguyên tố để tăng độ an toàn
  let q = randomPrime(50, 100);
  while (q === p) {
    q = randomPrime(50, 100);
  }
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 2;
  while (gcd(e, phi) !== 1) {
    e++;
  }
  const d = modInverse(e, phi);
  return { publicKey: { e, n }, privateKey: { d, n } };
}

// Hàm tính số nghịch đảo modular
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return null;
}

// Hàm mã hóa văn bản
function encrypt(publicKey, plaintext) {
  const { e, n } = publicKey;
  const encryptedMsg = [];
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.codePointAt(i); // Lấy mã Unicode của ký tự
    encryptedMsg.push(bigInt(charCode).modPow(bigInt(e), bigInt(n)).toString());
  }
  return encryptedMsg;
}

// Hàm giải mã văn bản
function decrypt(privateKey, encryptedMsg) {
  const { d, n } = privateKey;
  let decryptedMsg = "";
  for (let i = 0; i < encryptedMsg.length; i++) {
    const charCode = Number(
      bigInt(encryptedMsg[i]).modPow(bigInt(d), bigInt(n)).toString()
    );
    decryptedMsg += String.fromCodePoint(charCode); // Chuyển mã Unicode thành ký tự
  }
  return decryptedMsg;
}

// Hàm tính lũy thừa modulo
function modPow(base, exponent, modulus) {
  let result = 1;
  base %= modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent >>= 1;
  }
  return result;
}

// Ví dụ sử dụng
const { publicKey, privateKey } = generateKeyPair();

export { publicKey, privateKey, encrypt, decrypt };
