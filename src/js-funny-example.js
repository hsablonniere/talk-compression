const order = [];
function asyncTimeout(duration){
    return new Promise((resolve) => {
        setTimeout(() => {
            order.push(duration)
            resolve()
        }, duration)
    })
};
async function fastestSortingAlgorithm(numberList){
    await Promise.all(numberList.map(number => asyncTimeout(number)))
    console.log(order)
};

fastestSortingAlgorithm([10000, 10, 100, 1000, 1]);
