const add = (a, b) =>{
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(a+b)
        }, 2000);
    });
}
// Promise chaining with multiple Nest
// add(1,2).then((sum) =>{
//     console.log('sum :'+ sum);
//     add(sum, 4).then((sum2) => {
//         console.log('sum2 :'+ sum2);
//     }).catch((error) => {
//         console.log('error :'+ error);
//     });
// }).catch((error) => {
//     console.log('error :'+ error);
// });

// Promise chaining
add(1, 2).then((sum1) => {
    console.log('sum1 :'+sum1);
    return add(sum1, 4)
}).then((sum2) => {
    console.log('sum2 :'+sum2);
    return add(sum2, 4)
}).then((sum3) => {
    console.log('sum3 :'+sum3);
}).catch((error) => {
    console.log('Error While Adding'+ error);
});