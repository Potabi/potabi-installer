function changePage(to_page, from_page){
    document.getElementById(to_page).classList.toggle("hidden")
    document.getElementById(from_page).classList.toggle("hidden")
}

function resetPrevious(previousSectionNumber){
    system.exec(`sed -i '${previousSectionNumber}d' conf/config.conf`)
}

function updateConfig(configuring, conf_value){
    writer.config(`${configuring}=${conf_value}`);
}

function readAllAndSetData(list, currentID, nextID, tableID){
    data_list = list.split(",");
    for(i in data_list){
        data = data_list[i].split("|")
        var newHtml =  `<tr class="table-row w-full">
                            <td class="table-cell">
                                <a onclick="changePage('${nextID}', '${currentID}'); updateConfig('lang','${data[0]}');">
                                    ${data[1]}
                                </a>
                            </td>
                        </tr>
                        `
        document.getElementById(tableID).innerHTML += newHtml;
    }
}

function readAll(){
    languages = reader.fileLanguages();
    keyboards = reader.fileKeyboards();
    readAllAndSetData(languages, "index", "select_keyboard", "langs")
    readAllAndSetData(keyboards, "select_keyboard", "select_disk", "keybds")
}