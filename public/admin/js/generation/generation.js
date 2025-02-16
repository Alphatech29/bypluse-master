let submit, cbText;

document.addEventListener("DOMContentLoaded", () => {
  //Submit Form
  document.querySelectorAll("form#editGeneration").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const obj = {
        g_name: e.currentTarget.parentElement.querySelector("input#name").value,
        g_percent:
          e.currentTarget.parentElement.querySelector("input#percent").value,
        g_plan_percent:
          e.currentTarget.parentElement.querySelector("input#percent_plan")
            .value,
      };

      const id = e.currentTarget.parentElement.querySelector("input#id").value;

      submit = e.currentTarget.parentElement.querySelector("button#button");
      fetchResourse(obj, `/admin/generation?id=${id}`, "PUT", "reload");
    });
  });

  //DELETE
  document.querySelectorAll("a.delete-package").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const id = e.currentTarget.dataset.id;

      submit = e.currentTarget;

      swal({
        title: "Are you sure?",
        text: "You cannot recover this once deleted!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((wilDelete) => {
        if (wilDelete) {
          fetchResourse({}, `/admin/generation?id=${id}`, "DELETE", "reload");
        }
      });
    });
  });

  document.querySelector("form#new").addEventListener("submit", (e) => {
    e.preventDefault();
    const obj = {
      g_name: e.currentTarget.parentElement.querySelector("input#name").value,
      g_percent:
        e.currentTarget.parentElement.querySelector("input#percent").value,
      g_plan_percent:
        e.currentTarget.parentElement.querySelector("input#percent_plan").value,
    };

    submit = e.currentTarget.parentElement.querySelector("button#button");
    fetchResourse(obj, `/admin/generation`, "POST", "reload");
  });
});
