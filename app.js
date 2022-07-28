const calculate = document.getElementById("calculate")

// Getting Values 
const loanAmount = document.getElementById("loanAmount")
const interest = document.getElementById("interest")
const years = document.getElementById("years")

calculate.addEventListener("click", (e) => {


    if (loanAmount.value && interest.value && years.value ) {
        // console.log(loanAmount, interest, years)

        // calculating EMI

        const amount = parseFloat(loanAmount.value);
        const calculateInterest = parseFloat(interest.value) / 100 / 12;
        const calculatePayements = parseFloat(years.value) * 12;

        // Calculate Monthly Payment

        const rate = Math.pow(1 + calculateInterest, calculatePayements)
        const monthly = (amount * rate * calculateInterest) / (rate - 1);
        const monthlyPayment = monthly.toFixed(0)

        // Total Interest 

        const totalInterest = (monthly * calculatePayements - amount).toFixed(0)

        // Total Payment 

        const totalPayment = (monthly * calculatePayements).toFixed(0)

        document.getElementById("monthlyPayment").innerHTML = "TK " + monthlyPayment;
        document.getElementById("totalInterest").innerHTML = "TK " + totalInterest;
        document.getElementById("totalAmount").innerHTML = "TK " + totalPayment;

        // Build the chart
        Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'EMI Piechart'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Monthly Payments',
                    y: ((monthlyPayment * 100) / 100),
                    sliced: true,
                    selected: true
                }, {
                    name: 'Total Interest',
                    y: ((totalInterest * 100) / 100)
                }, {
                    name: 'Total Amount',
                    y: ((totalPayment * 100) / 100)
                }]
            }]
        });

    } else {
        alert("Insert all the required inputs to calculate the EMI")
    }

    e.preventDefault()
})

document.getElementById("reset").addEventListener("click", ()=>{
    loanAmount = ""
    interest = ""
    years = ""
})