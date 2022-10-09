const form = document.querySelector("#generator-form")

const qrcode = document.querySelector("#qrcode")

const onGenerateForm = (e) => {
    e.preventDefault()

    clearUI()

    const url = document.querySelector("#url").value
    const size = document.querySelector("#size").value

    if (url === "") {
        alert("请输入URL")
    } else {
        showSpinner()

        setTimeout(() => {
            hideSpinner()
            generateQRCode(url, size)

            setTimeout(() => {
                const downloadUrl = qrcode.querySelector("img").src
                createDownloadBtn(downloadUrl)
            }, 100)
            
        }, 1000)

    }

    
}

// 显示spinner
const showSpinner = () => {
    const spinner = document.querySelector("#spinner")
    spinner.style.display = "block"
}

// 隐藏spinner
const hideSpinner = () => {
    const spinner = document.querySelector("#spinner")
    spinner.style.display = "none"
}

// 生成二维码
const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    })
}

const clearUI = () => {
    qrcode.innerHTML = ""

    const btn = document.querySelector("#download-url")
    if (btn) {
        btn.remove()
    }
}

const createDownloadBtn = (downloadUrl) => {
    const link = document.createElement("a")
    link.id = "download-url"
    link.className = "download-btn"
    link.href = downloadUrl
    link.download = "二维码"
    link.innerHTML = "下载二维码图片"
    document.querySelector("#bottom-container").appendChild(link)
}

form.addEventListener("submit", onGenerateForm)