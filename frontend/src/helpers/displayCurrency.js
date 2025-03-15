const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-FR',{
        style : "currency",
        currency : 'XAF',
         style: 'decimal'
    })

    return formatter.format(num)

}

export default displayINRCurrency