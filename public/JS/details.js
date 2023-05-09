const form = document.querySelector("form");
const commentButton = document.querySelector("#commentsubmit");

console.log("jeg finnes");

commentButton.addEventListener("click", async (e) => {
  e.preventDefault();

  //form values
  const CONTENT = form.CONTENT.value
  const id = form.AUTHOR.dataset.doc
  const OB = form.ORIGINALBLOG.dataset.doc



  try {
        //sender data som lager bruker
        const res = await fetch('/createComment',{
            method: 'post',
            body: JSON.stringify({content: CONTENT, author: id, originalBlog: OB}),
            headers: {'Content-Type': 'application/json'}
        })
        const comment = await res.json();
           
        console.log("comment request sent" + comment);

    } catch (err) {
        console.log(err)
    }

})

function deleteTRASH(id) {
  const endpoint = `/details/${id}`;
  fetch(endpoint, {
    method: "DELETE",
  })
  .then(response => response.json())
  .then(data => window.location.href = data.redirect)
  .catch(err => console.log(err));
}