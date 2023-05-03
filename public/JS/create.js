const form = document.querySelector("form");
const blogButton = document.querySelector("#blogsubmit");


blogButton.addEventListener("click", async (e) => {
  e.preventDefault();

  //form values
  const TITLE = form.TITLE.value
  const CONTENT = form.CONTENT.value
  const id = form.AUTHOR.dataset.doc

  console.log(id);



  try {
        //sender data som lager bruker
        const res = await fetch('/create',{
            method: 'post',
            body: JSON.stringify({title: TITLE, content: CONTENT, id: id}),
            headers: {'Content-Type': 'application/json'}
        })
        const blog = await res.json();
           
        console.log("blog request sent" + blog);

    } catch (err) {
        console.log(err)
    }

})