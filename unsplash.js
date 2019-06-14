var randomImage = document.getElementById('background');


function getPic() {
    fetch('https://source.unsplash.com/random')
    .then(function(response) {
        if (!response.ok) {
            console.log(response);
            return new Error(response);
        }
        return response.blob();
    })
    .then(function(photoBlob) {
        var objectURL = URL.createObjectURL(photoBlob);
        randomImage.src = objectURL;
    })
    .catch(function(err) {
        console.log(err);
    });
}

getPic()


document.getElementById('new-bg').addEventListener('click', x => {getPic()})
