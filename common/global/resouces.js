const subjectText = [
    "國文",
    "數學",
    "英文",
    "理化",
    "地科",
    "地理",
    "公民",
    "歷史",
    "視藝",
    "童軍",
    "家政",
    "輔導",
    "生科",
    "資訊",
    "體育",
    "健教",
    "西樂",
    "國樂",
    "聽寫",
    "樂理",
    "術科",
    "札記"
]

const doingText = [
    "發",
    "考",
    "交",
    "帶",
    "寫",
    "訂正",
    "簽名",
    "預習",
    "複習",
    "登記"
]

const bookText = [
    "課本",
    "習作",
    "講義",
    "大講",
    "小講",
    "學單",
    "考卷"
]

const alertDataDb = {
    LAST: {
        message: 'Wrong! This is the last day\'s record. Please click the "today" button.',
        classData: 'danger'
    },
    NEWEST: {
        message: 'Warning! This is the newest data.',
        classData: 'warning'
    },
    DELETE_OK: {
        message: 'successful!',
        classData: 'success'
    },
    PASSWORD_ERROR: {
        message: 'Incorrect password or type.',
        classData: 'warning',
    },
    ERROR: {
        message: 'An unknown error has occurred. Please try again later.',
        classData: 'danger'
    },
    CORRECT: {
        message: 'answer correct!!',
        classData: 'success'
    },
    WRONG: {
        message: 'answer wrong!!',
        classData: 'danger'
    },
    HAVE_VERIFIED: {
        message: 'you have verified before.',
        classData: 'success'
    },
    VERIFIED_ERROR: {
        message: 'incorrect code we already send a new one',
        classData: 'warning'
    },
    CANNOT_FIND_USER:{
        message: 'Cannot find this user',
        classData: 'warning'
    },
    SOMEONE_USE_THIS_NAME:{
        message: 'Somebody uses this name.',
        classData: 'warning'
    }
}

const profileSetting = [
    "password",
    "name",
    "photo",
    "class",
    "classroom password"
]

export { subjectText, doingText, bookText, alertDataDb, profileSetting }