function changePage(to_page, from_page){
    document.getElementById(to_page).classList.toggle("hidden")
    document.getElementById(from_page).classList.toggle("hidden")
}

function resetPrevious(previousSectionNumber){
    system.exec(`sed -i '${previousSectionNumber}d' conf/config.conf`)
}

function updateConfig(configuring, conf_value){
    writer.config(`${configuring}="${conf_value}"`);
}

function readAllAndSetData(list, currentID, nextID, tableID, configName){
    data_list = list.split(",");
    for(i in data_list){
        data = data_list[i].split("|")
        var newHtml =  `<tr class="table-row w-full">
                            <td class="table-cell">
                                <a onclick="changePage('${nextID}', '${currentID}'); updateConfig('${configName}','${data[0].trim()}');">
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
    system.getDisks();
    disks     = reader.fileDisks();
    readAllAndSetData(languages, "index","select_keyboard", "langs", "lang")
    readAllAndSetData(keyboards, "select_keyboard", "select_disk", "keybds", "keyboard")
    readAllAndSetData(disks,"select_disks", "", "disklist", "disk")
}