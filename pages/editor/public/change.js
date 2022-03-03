function change(number){
    if(number == 0){
        return '日'
    }else if(number == 1){
        return '一'
    }else if(number == 2){
        return '二'
    }else if(number == 3){
        return '三'
    }else if(number == 4){
        return '四'
    }else if(number == 5){
        return '五'
    }else if(number == 6){
        return '六'
    }
}

function howManyDaysLeft(number){
    if(number == 0){
        return 8
    }else if(number == 1){
        return 7
    }else if(number == 2){
        return 6
    }else if(number == 3){
        return 5
    }else if(number == 4){
        return 4
    }else if(number == 5){
        return 3
    }else if(number == 6){
        return 2
    }
}

export { change, howManyDaysLeft }