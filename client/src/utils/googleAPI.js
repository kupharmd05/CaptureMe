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
               console.log(data);
               var text=data.responses[0].fullTextAnnotation.text;

               
               var newLineText = text.split("\n");
               console.log(newLineText);
               printText(newLineText);
               });
            })
            .catch(function( error, response, body ){
               console.log(error);
            });
         });    
}

function printText(text){
   console.log(text);
   text.pop();
   for(var i = 0; i < text.length; i++) {
      console.log(text[i]);
      
      let form = document.createElement("form");
      let input = document.createElement("input");
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      form.append(ul);
      ul.append(li);
      li.append(input);
      input.setAttribute("value", text[i]);
      document.querySelector(".print").append(li);
   }
   
}

export default sendImage;