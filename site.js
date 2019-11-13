function hideLoad() {

  document.getElementById('load').style.display='none';
}

function register(a,b,name)
{
  if(a==1)
  {
    document.getElementById("regDiv").style.display="inherit";
    document.getElementById('mainDiv').style.filter='blur(3px)';
    document.getElementById('mainDiv').style.pointerEvents='none';
    document.getElementById('idTour').value=b;
    document.getElementById('idTour1').value=b;
    document.getElementById	('nameTour').innerHTML=name;
    document.getElementById	('nameTour').innerHTML=name;


  }
  else
  {

    document.getElementById("regDiv").style.display="none";
    document.getElementById('mainDiv').style.filter='none';
    document.getElementById('mainDiv').style.pointerEvents='auto';
  }
}

function setSlides()
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {

    document.getElementById("bgDiv").style.height="300px";
    document.getElementById("bg1").style.maxHeight="300px";
    document.getElementById("bg2").style.maxHeight="300px";
    document.getElementById("bg3").style.maxHeight="300px";

    document.getElementById("wlcm").style.fontSize="2.1px";
    document.getElementById("wlcm").style.marginLeft="12em";
    document.getElementById("wlcm").style.marginTop="22em";

    document.getElementById("wlcm1").style.fontSize="4px";
    document.getElementById("wlcm1").style.marginLeft="6em";
    document.getElementById("wlcm1").style.marginTop="2em";

    document.getElementById("wlcm2").style.fontSize="2.4px";
    document.getElementById("wlcm2").style.marginLeft="10em";
    document.getElementById("wlcm2").style.marginTop="4em";


  }
}

function centerAll()
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    changeSearch();
    document.getElementById("resP").style.fontSize='16px';
  }

}


window.onscroll = function() {scrollFunction()};

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }

  if(document.body.scrollTop ==0 || document.documentElement.scrollTop== 0) {
    document.getElementById("nav").style.display="inherit";
  }
  if(document.body.scrollTop >380 || document.documentElement.scrollTop>380) {
    document.getElementById("nav").style.display="none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function hideShow(id,idd,num)
{
  if(document.getElementById(id).style.display=="inherit" && num!=1)
  {
    document.getElementById(id).style.display="none";
    document.getElementById(idd).innerHTML="►";
  }
  else
  {
    document.getElementById(id).style.display="inherit";
    document.getElementById(idd).innerHTML="▼";
  }
}

function showChange(a)
{
  if(a==1)
  {
    document.getElementById("changeDiv").style.display="inherit";
    document.getElementById('main1').style.filter='blur(3px)';
    document.getElementById('main1').style.pointerEvents='none';

  }
  else
  {
    document.getElementById("changeDiv").style.display="none";
    document.getElementById('main1').style.filter='none';
    document.getElementById('main1').style.pointerEvents='auto';
  }

}

function changeForm(a)
{
  if(a==1)
  {
    document.getElementById("oldTeamForm").style.display="none";
    document.getElementById("newTeamForm").style.display="inherit";

    document.getElementById("new").style.cursor="default";
    document.getElementById("old").style.cursor="pointer";

    document.getElementById("new").style.color="rgb(0,102,145)";
    document.getElementById("old").style.color="grey";

    document.getElementById("newHr").style.border="0.5px solid rgb(0,102,145)";
    document.getElementById("oldHr").style.border="";
  }
  else
  {

    document.getElementById("newTeamForm").style.display="none";
    document.getElementById("oldTeamForm").style.display="inherit";

    document.getElementById("old").style.cursor="default";
    document.getElementById("new").style.cursor="pointer";

    document.getElementById("old").style.color="rgb(0,102,145)";
    document.getElementById("new").style.color="grey";

    document.getElementById("oldHr").style.border="0.5px solid rgb(0,102,145)";
    document.getElementById("newHr").style.border="";
  }
}
