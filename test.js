function a(x) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(console.log(x))
    }, 1000);
})
}

function b(x) {
    console.log(x)
}

 function c() {
    // const s= await
      a("wael").then(b("chorfan"))
    // console.log(s);    
    // b("chorfan")    
}

c()

