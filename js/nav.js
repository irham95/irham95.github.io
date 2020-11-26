document.addEventListener("DOMContentLoaded", function() {
    
    const sideNav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sideNav);

    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if(this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(elem => {
                    elem.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".topnav a, .sidenav a").forEach(elem => {
                    elem.addEventListener('click', event => {
                        const sideNavClose = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sideNavClose).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if(page === "") page = "klasemen";

    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");

                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;

                    if (page === "klasemen") {
                        getStanding();
                    } else if (page === "pertandingan") {
                        getAllMatches(1);
                    } else if (page === "tersimpan") {
                        showAllSaved();
                    }

                } else if(this.status === 404) {
                    content.innerHTML = '<p>Halaman tidak bisa ditemukan!</p>';
                } else {
                    content.innerHTML = '<p>Halaman Tidak bisa diakses!</p>';
                }
            }
        };

        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }
});