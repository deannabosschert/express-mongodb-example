const multer = require('multer')

module.exports = multer({ // verzorgt het storen van de geuploade afbeeldingen in de aangegeven folder
    storage: multer.diskStorage({
        destination: (req, file, data) => {
            data(null, 'public/uploads')
        },
        filename: (req, file, data) => {
            data(null, Date.now() + '.jpg') // verander filename
        }
    })
})