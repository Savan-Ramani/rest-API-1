const primeNumberGenerator = (upper, lower) => {
  const ret = [];
  for (let i = upper; i < lower; i++) {
    if (isPrime(i)) {
      ret.push(i);
    }
  }
  return ret;
};

const isPrime = (n) => {
  // 0 and 1 is not prime
  if (n == 0 || n == 1) {
    return false;
  }
  // 2 is a prime number
  if (n == 2) {
    return true;
  }

  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
};

module.exports = { primeNumberGenerator };
