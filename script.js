

function handleFileSelect(e) {
    const files = e.target.files;
    const filesArray = [];
    for(let i=0; i<files.length; i++) {
        filesArray.push(files[i]);
    }
    filesArray.sort((a,b) => {
        const a_ext = getExtension(a.name);
        const b_ext = getExtension(b.name);
        return a_ext.localeCompare(b_ext);
    })
    filesArray.forEach(file => document.getElementById("table_body").appendChild(createTableRow(file)))
}

function createTableRow(file){
    const tr = document.createElement("tr");
    const td_name = document.createElement("td");
    td_name.innerHTML = file.name
    const td_size = document.createElement("td");
    td_size.textContent = formatSize(file.size)
    const td_info = document.createElement("td");
    const info_btn = createInfoTooltip(file)


    td_info.appendChild(info_btn)
    tr.appendChild(td_name)
    tr.appendChild(td_size)
    tr.appendChild(td_info)
    return tr;
}

function createTableInfoRow(file){
    const tr = document.createElement("tr");
    const td_name = document.createElement("td");
    td_name.innerHTML = file.name
    const td_ext = document.createElement("td");
    td_ext.textContent = getExtension(file.name);
    const td_size = document.createElement("td");
    td_size.textContent = formatSize(file.size)
    const td_other = document.createElement("td");
    td_other.textContent = file.type;


    tr.appendChild(td_name)
    tr.appendChild(td_ext)
    tr.appendChild(td_size)
    tr.appendChild(td_other)
    return tr;
}

function createInfoTooltip(file){
    const btn = document.createElement("button");
    btn.innerHTML="Info";
    btn.classList.add("tooltip")
    const span = document.createElement("span");
    span.classList.add("tooltiptext");

    const table = document.createElement("table");
    table.appendChild(createTableInfoRow(file));

    span.appendChild(table)
    btn.appendChild(span)
    return btn;
}

function getExtension(filename){
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
}

function formatSize(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

document.getElementById("filepicker").addEventListener("change", handleFileSelect)

