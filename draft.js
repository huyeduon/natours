async function fetchData() {
  try {
    const res1 = await fetch('url1');
    const data1 = await res1.json();
    const res2 = await fetch('url2');
    const data2 = await res2.json();
  } catch (err) {
    // handle error
  }
}

fetchData();
