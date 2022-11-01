let fs = require("fs");

let dic = require("./models/Dictionary").DICTIONARY;
let lexer = require("./models/Lexer.js").LEXER;
let parser = require("./models/parser.js").parser;


/*
fs.readFile("test.c--", "utf-8", function (error,content) {
    let text = content.replace(/\s\s+/gm, " ");
    let strings = text.split(";");

    let lexems = [];
    for (let i = 0; i < strings.length; i++) {
        let curendstring = strings[i].trim();
        if (curendstring !== "") {
            let words = curendstring.split(" ");
            
            let stringObject = {};
            for (let j = 0; j < words.length; j++) {
                if (words[j].toLowerCase() === "print") {
                    stringObject["id"] = "print";
                } if (words[j].toLowerCase() === "print.") {
                    stringObject["id"] = "print.";
                }
                else if (words[j].toLowerCase() === "=") {
                    stringObject["operator"] = "=";
                } else if (words[j].toLowerCase() === "+") {
                    stringObject["operator"] = "+";
                }
                else if (words[j].toLowerCase() === "!") {
                    stringObject["operator"] = "!";
                }
                else if (words[j].toLowerCase() === "-") {
                    stringObject["operator"] = "-";
                }
                else if (words[j].toLowerCase() === "*") {
                    stringObject["operator"] = "*";
                }
                else if (words[j].toLowerCase() === "/") {
                    stringObject["operator"] = "/";
                } else if (words[j].toLowerCase() === "&") {
                    stringObject["operator"] = "&";
                }
                else
                {
                    let CopyString = curendstring;
                    if (/PRINT = \((.*)\)/gim.test(CopyString)) {
                        let str = CopyString.replace(/PRINT = \((.*)\)/gim, "$1");
                        stringObject["string"] = str;
                    } else if (/PRINT = \'(.*)\'/gim.test(CopyString)) {
                        let str = CopyString.replace(/PRINT = \((.*)\)/gim, "$1");
                        stringObject["string"] = str;
                    } else if (/PRINT = \"(.*)\"/gim.test(CopyString)) {
                        let str = CopyString.replace(/PRINT = \((.*)\)/gim, "$1");
                        stringObject["string"] = str;
                    } else if (/PRINT = sig.(.*)/gim.test(CopyString)) {
                        let str = CopyString.replace(/PRINT = sig.(.*)/gim, "$1");
                        stringObject["error"] = str;
                    } else if (/PRINT. = sig.(.*)/gim.test(CopyString)) {
                        let str = CopyString.replace(/PRINT. = sig.(.*)/gim, "$1");
                        stringObject["sig"] = str;
                    } else if (/PRINT = (.*)/gim.test(CopyString)) {
                        let str = CopyString.replace(/PRINT = (.*)/gim, "$1");
                        stringObject["number"] = str;
                    } 
                }
            }
            lexems.push(stringObject);
        }

    }
    
    console.log(JSON.stringify(lexems,null,4));
    
    
});*/


fs.readFile("test.c--", "utf-8", function (error, content) {
    if (error === null) {
        let lexems = lexer(content, dic);
        let parsedString = parser(lexems, dic);
        console.log(parsedString);
        fs.writeFile("sourse/C_Main/C_consle.c", parsedString, function (error) {

            if (error) throw error; // если возникла ошибка
            console.log("Асинхронная запись файла завершена. Содержимое файла:");
            let data = fs.readFileSync("sourse/C_Main/C_consle.c", "utf8");
            console.log(data);  // выводим считанные данные
        });
       // console.log(JSON.stringify(lexems, null, 4));
    } else {
        console.error("ERROR!?");
        console.error(error);

    }

});