function sendImage(data, key) {
         return new Promise((resolve, reject) => {
            fetch("https://vision.googleapis.com/v1/images:annotate?key=" + key,{
               
               method: 'post',
               body: data,
               contentType: 'application/json',
               dataType: 'json'
            })
            .then(function(response){
               response.json().then(function(data){
                  console.log("API: ", data);
                  resolve(data.responses[0].fullTextAnnotation.text);
               });
            })
            .catch(function( error, response, body ){
               reject(error);
            });
         });    
}

// function printText(text){
//    console.log(text);
//    text.pop();
//    for(var i = 0; i < text.length; i++) {
//       console.log(text[i]);
      
//       let form = document.createElement("form");
//       let input = document.createElement("input");
//       let ul = document.createElement("ul");
//       let li = document.createElement("li");
//       let print = document.querySelector("print");
//       form.append(ul);
//       ul.append(li);
//       li.append(input);
//       input.setAttribute("value", text[i]);
//       input.append(print);
//    }
   
// }

export default sendImage;