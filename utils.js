import JSSoup from 'jssoup';

const TITLE_LABEL_NAME = 'SSR_CLSRCH_MTG1';
const LABEL_NBR = 'MTG_CLASS_NBR';
const LABEL_SECTION = 'MTG_CLASSNAME';
const LABEL_DAYTIME = 'MTG_DAYTIME';
const LABEL_ROOM = 'MTG_ROOM';
const LABEL_INSTR = 'MTG_INSTR';
const LABEL_DATERANGE = 'MTG_TOPIC';
const LABEL_CLASS_INF = 'NC_CLASS_INF_WK_DESCR';

export function extractClassInfo(rawXml) {
    var soup = new JSSoup.default(rawXml);
    var info = soup.findAll('DIV')
    var infoResult = [];

    for (const element of Object.entries(info)) {
        if (element[1].attrs.hasOwnProperty("id")) {
            let currentId = element[1].attrs.id;

            if (currentId.includes(TITLE_LABEL_NAME)) {
                let classInfo = {};
                classInfo['name'] = element[1].contents[0].text.trim();

                let classDetails = element[1].contents[1].contents[1].contents;
                for (const detailElement of Object.entries(classDetails)) {
                    if (detailElement[1].contents[0].hasOwnProperty('attrs')) {
                        let currentDetailId = detailElement[1].contents[0].attrs.id;
                        let currentText = detailElement[1].contents[0].text;
                        
                        if (currentDetailId.includes(LABEL_NBR)) {
                            classInfo['number'] = currentText;
                        } else if (currentDetailId.includes(LABEL_SECTION)) {
                            classInfo['section'] = currentText.replace('\n', ', ');
                        } else if (currentDetailId.includes(LABEL_DAYTIME)) {
                            classInfo['daytime'] = currentText;
                        } else if (currentDetailId.includes(LABEL_ROOM)) {
                            classInfo['room'] = currentText;
                        } else if (currentDetailId.includes(LABEL_INSTR)) {
                            classInfo['instructor'] = currentText;
                        } else if (currentDetailId.includes(LABEL_DATERANGE)) {
                            classInfo['daterange'] = currentText;
                        } else if (currentDetailId.includes(LABEL_CLASS_INF)) {
                            classInfo['other'] = currentText;
                        }
                    }
                }

                infoResult.push(classInfo);
            } 
        }
    }
    
    return infoResult;
}