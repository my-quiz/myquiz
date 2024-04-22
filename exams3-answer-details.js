window.addEventListener("unload", function (event) {
    localStorage.removeItem("detail-jawaban")
});
window.addEventListener("load", detailStudentAnswers)
function detailStudentAnswers() {
    const data = JSON.parse(localStorage.getItem("detail-jawaban"))
    if (data) {
        const label1 = data['identitasSoal'][0] + ' : ' + data['identitasSoal'][3]
        const label2 = data['identitasSoal'][1] + ' : ' + data['identitasSoal'][4]
        const label3 = data['identitasSoal'][2] + ' : ' + data['identitasSoal'][5]
        const nilai = data['nilai']
        $('.label1').html(label1)
        $('.label2').html(label2)
        $('.label3').html(label3)
        $('.nilai').html('Score : ' + nilai)
        Object.entries(data['jawaban']).forEach(([key, value], index) => {
            let bgWrong = ''
            value == 'wrong' ? bgWrong = 'bg-merah1' : bgWrong = ''
            let detail = `
                                <tr class="poppins">
                                    <td class="poppins border-1">${index + 1}</td>
                                    <td class="poppins kiri border-1 ${bgWrong}">${value}</td>
                                </tr>
                            `
            $('tbody').append(detail)
        })  
    } else {
        location.href = location.origin + "/student-project"
    }
}
document.querySelector(".icon-logo").addEventListener("click", function () {
    location.reload()
})
document.querySelector(".icon-back").addEventListener("click", function () {
    localStorage.removeItem("detail-jawaban")
    location.href = location.origin + "/student-project"
})