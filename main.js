const transactions = require('./transactions');

function getUniqueTransactionTypes(data){
    const array = [];

    for (const group of data){
        for (const item of group){
            array.push(item?.transaction_type);
        }
    }

    const set = new Set(array);
    console.log(set);
    return set;
}

function calculateTotalAmount(data){
    let sum = 0;
    for (const group of data){
        sum += group.reduce((accomulator, curret) => accomulator+curret?.transaction_amount, 0);
    }
    console.log(sum);
    return sum;
}

function getTransactionByType(data, type){
    for (const group of data){
        for (const item of group){
            if(item?.transaction_type == type){
                console.log(item);
            }
        }
    }
}

function dateToNumber(str1){
    const str2 = str1.split("-").join("");
    return Number(str2);
}

function getTransactionsInDateRange(data, startDate, endDate){
    for (const group of data){
        for (const item of group){
            if(dateToNumber(item?.transaction_date) >= dateToNumber(startDate) && dateToNumber(item?.transaction_date) <= dateToNumber(endDate)){
                console.log(item);
            }
        }
    }
}

function getTransactionsByMerchant(data, merchantName){
    const arr = [];
    for (const group of data){
        group.forEach(element => {
            if(element?.merchant_name == merchantName){
                arr.push(element);
            }
        });
    }
    console.log(arr);
    return arr;
}

function calculateAverageTransactionAmount(data){
    let sum = 0;
    let count = 0;
    for (const group of data){
        for (const item of group){
            sum += item?.transaction_amount;
            count++;
        }
    }

    console.log(sum / count);
    return sum / count;
}

function getTransactionsByAmountRange(data, minAmount, maxAmount){
    const arr = [];
    for (const group of data){
        for (const item of group){
            if(item?.transaction_amount >= minAmount && item?.transaction_amount <= maxAmount){
                arr.push(item);
            }
        }
    }
    console.log(arr);
    return arr;
}

function calculateTotalDebitAmount(data){
    let sum = 0;
    for (const group of data){
        for (const item of group){
            if(item?.transaction_type == "debit"){
                sum += item?.transaction_amount;
            }
        }
    }
    console.log(sum);
    return sum;
}

function findMostTransactionsMonth(data){
    const arr = [0,0,0,0,0,0,0,0,0,0,0,0];//array index is month number 
    for (const group of data){
        for (const item of group){
            arr[parseInt(item?.transaction_date.split("-")[1], 10)-1]++;
        }
    }
    let max = 0;
    let monthIndex = 0;
    for(let i = 0; i<arr.length; i++){
        if(arr[i] > max){
            max = arr[i];
            monthIndex = i;
        }
    }
    console.log(`Most Transactions Month number: ${monthIndex+1}`);
    return monthIndex;
}

function findMostDebitTransactionMonth(data){
    const arr = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (const group of data){
        for (const item of group){
            if(item?.transaction_type == "debit"){
                arr[parseInt(item?.transaction_date.split("-")[1], 10)-1]++;
            }
        }
    }
    let max = 0;
    let monthIndex = 0;
    for(let i = 0; i<arr.length; i++){
        if(arr[i] > max){
            max = arr[i];
            monthIndex = i;
        }
    }
    console.log(`Most Debit Transaction Month number: ${monthIndex+1}`);
    return monthIndex;
}

function mostTransactionTypes(data){
    let debitCount = 0;
    let creditCount = 0;
    for (const group of data) {
        for (const item of group) {
            if (item.transaction_type == "debit") debitCount++;
            else if (item.transaction_type == "credit") creditCount++;
        }
    }
    if (debitCount > creditCount) return "debit";
    else if (creditCount > debitCount) return "credit";
    else return "equal";
}

function getTransactionsBeforeDate(data, date){
    const arr = [];
    for (const group of data){
        for (const item of group){
            if(dateToNumber(item?.transaction_date) <= dateToNumber(date)){
                console.log(item);
                arr.push(item);
            }
        }
    }
    return arr;
}

function findTransactionById(data, id){
    for (const group of data){
        for (const item of group){
            if (item.transaction_id == id) {
                console.log(item);
                return item; 
            }
        }
    }
    return;
}

function mapTransactionDescriptions(data) {
    const arr = []
    data.flat().map(item => {arr.push(item?.transaction_description);})
    console.log(arr);
    return arr;
}


getUniqueTransactionTypes(transactions);
console.log("-------------");
calculateTotalAmount(transactions);
console.log("-------------");
getTransactionByType(transactions, "debit");
console.log("-------------");
getTransactionsInDateRange(transactions, "2019-01-02", "2019-01-07");
console.log("-------------");
getTransactionsByMerchant(transactions, "BankXYZ")
console.log("-------------");
calculateAverageTransactionAmount(transactions);
console.log("-------------");
getTransactionsByAmountRange(transactions, 10, 100)
console.log("-------------");
calculateTotalDebitAmount(transactions)
console.log("-------------");
findMostTransactionsMonth(transactions);
console.log("-------------");
findMostDebitTransactionMonth(transactions);
console.log("-------------");
mostTransactionTypes(transactions);
console.log("-------------");
getTransactionsBeforeDate(transactions, "2019-01-02");
console.log("-------------");
findTransactionById(transactions, 2);
console.log("-------------");
mapTransactionDescriptions(transactions);
