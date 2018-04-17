var Table = require('cli-table');
exports.makeTable = {
    //pretty table :)
    
    prodList: new Table({
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        },
        head: ['Item Id', 'Product Name', 'Department', 'Price', 'In Stock'],
        colWidths: [10, 30, 20, 10, 10]
    }),
}