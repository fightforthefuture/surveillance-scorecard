var PoliticalScoreboardController=Composer.Controller.extend({elements:{".good .filtered":"good_list",".bad .filtered":"bad_list",".meh .filtered":"meh_list",".panel.meh":"meh_panel",select:"select"},events:{"change select":"filter"},collection:null,good:null,bad:null,meh:null,init:function(){this.render(),this.good=new Composer.FilterCollection(this.collection,{filter:function(a){return a.get("score")>=6}}),this.init_list(this.good,this.good_list),this.bad=new Composer.FilterCollection(this.collection,{filter:function(a){return a.get("score")<0}}),this.init_list(this.bad,this.bad_list),this.meh=new Composer.FilterCollection(this.collection,{filter:function(a){return a.get("score")>=0&&a.get("score")<=5}}),this.init_list(this.meh,this.meh_list)},init_list:function(a,b){new Composer.ListController({collection:a,inject:b,init:function(){this.track(this.collection,function(a,b){return new PoliticianController({inject:this.el,model:a})}.bind(this),{bind_reset:!0})}})},render:function(){var a=PoliticalScoreboardView({state:this.collection.state});this.html(a)},filter:function(){var a=this.select.options[this.select.selectedIndex].value;this.collection.state=a,this.collection.refresh(),0==this.meh.models().length?this.meh_panel.style.display="none":this.meh_panel.style.display="inline-block"}}),PoliticianController=Composer.Controller.extend({events:{"click button.tweet_link":"tweet","click button.info_link":"info","click h4":"tweet","click .headshot":"tweet"},model:null,init:function(){this.render()},render:function(){var a=PoliticianView({politician:this.model.toJSON()});this.html(a),this.el.className="politician"},tweet:function(a){a.preventDefault();var b=encodeURIComponent(".@"+this.model.get("twitter")+", lol");window.open("https://twitter.com/intent/tweet?text="+b)},info:function(a){a.preventDefault(),new PoliticianModalController({model:this.model})}}),PoliticianModalController=BaseShareModalController.extend({init:function(){this.render(),this.show(),console.log(this.model.toJSON())},render:function(){var a=this.base_render();a.firstChild.appendChild(PoliticianModalView({positions:this.model.get("score_criteria")})),this.html(a)}}),Politician=Composer.Model.extend({populateFromGoogle:function(a){var b=function(b){return a["gsx$"+b].$t.trim()};this.set({first_name:b("first"),last_name:b("name"),image:b("imagepleasedontedit"),bioguide:b("bioguide"),email:b("email"),phone:b("phone"),organization:b("organization"),state:b("state"),state_short:this.shortenState(b("state")),twitter:b("twitter"),party:b("partyaffiliation"),vote_usaf:b("voteusaf"),vote_tempreauth:b("votetempreauth"),office1:b("office1"),office1phone:b("office1phone"),office1geo:b("office1geo"),office2:b("office2"),office2phone:b("office2phone"),office2geo:b("office2geo"),office3:b("office3"),office3phone:b("office3phone"),office3geo:b("office3geo"),office4:b("office4"),office4phone:b("office4phone"),office4geo:b("office4geo"),office5:b("office5"),office5phone:b("office5phone"),office5geo:b("office5geo"),office6:b("office6"),office6phone:b("office6phone"),office6geo:b("office6geo"),office7:b("office7"),office7phone:b("office7phone"),office7geo:b("office7geo"),office8:b("office8"),office8phone:b("office8phone"),office8geo:b("office8geo"),urban_rural:b("urban-rural"),score:0,score_criteria:[],fisa_courts_reform_act:b("fisacourtsreformact"),s_1551_iosra:b("s1551iosra"),fisa_improvements_act:b("fisaimprovementsact"),fisa_transparency_and_modernization_act:b("fisatransparencyandmodernizationact"),surveillance_state_repeal_act:b("surveillancestaterepealact"),usa_freedom_prior_to_20140518:b("usafreedompriorto2014-05-18"),voted_for_conyers_amash_amendment:b("votedforconyersamashamendment"),voted_for_house_version_of_usa_freedom_act_2014:b("votedforhouseversionofusafreedomact2014"),voted_for_massie_lofgren_amendment_2014:b("votedformassielofgrenamendment2014"),whistleblower_protection_for_ic_employees_contractors:b("whistleblowerprotectionforicemployeescontractors"),first_usaf_cloture_vote:b("stusafcloturevote"),straight_reauth:b("straightreauth"),fisa_reform_act:b("fisareformact"),amendment_1449_data_retention:b("amendment1449dataretention"),amendment_1450_extend_implementation_to_1yr:b("amendment1450extendimplementationto1yr"),amendment_1451_gut_amicus:b("amendment1451gutamicus"),final_passage_usaf:b("finalpassageusaf"),s_702_reforms:b("reforms"),massie_lofgren_amendment_to_hr2685_defund_702:b("massielofgrenamendmenttohr2685defund702"),massie_lofgren_amendment_to_hr4870_no_backdoors:b("massielofgrenamendmenttohr4870nobackdoors")},{silent:!0}),this.doScore()},doScore:function(){var a=0,b=[];if("X"==this.get("fisa_courts_reform_act")){var c=3;b.push({score:c,info:"Supported the FISA Courts Reform Act"}),a+=c}if("X"==this.get("s_1551_iosra")){var c=4;b.push({score:c,info:"Supported the Intelligence Oversight and Surveillance Reform Act"}),a+=c}if("X"==this.get("fisa_improvements_act")){var c=-4;b.push({score:c,info:"Supported the FISA Improvements Act"}),a+=c}if("X"==this.get("fisa_transparency_and_modernization_act")){var c=-4;b.push({score:c,info:"Supported the FISA Transparency and Modernization Act"}),a+=c}if("X"==this.get("surveillance_state_repeal_act")){var c=4;b.push({score:c,info:"Supported the Surveillance State Repeal Act"}),a+=c}if("X"==this.get("usa_freedom_prior_to_20140518")){var c=2;b.push({score:c,info:"Supported the original USA Freedom Act (prior to May 18th, 2014)"}),a+=c}if("X"==this.get("voted_for_conyers_amash_amendment")){var c=4;b.push({score:c,info:"Voted for Conyers Amash Amendment"}),a+=c}if("X"==this.get("voted_for_house_version_of_usa_freedom_act_2014")){var c=-2;b.push({score:c,info:"Voted for gutted House version of USA Freedom Act of 2014"}),a+=c}if("X"==this.get("voted_for_massie_lofgren_amendment_2014")){var c=3;b.push({score:c,info:"Voted for Massie-Lofgren Amendment (2014)"}),a+=c}if("X"==this.get("whistleblower_protection_for_ic_employees_contractors")){var c=4;b.push({score:c,info:"Supported whistleblower protection measures for Intelligence employees and contractors"}),a+=c}if("GOOD"==this.get("first_usaf_cloture_vote")){var c=4;b.push({score:c,info:"Voted NO on reauthorizing the PATRIOT Act *and* NO on cloture for the first Senate USA Freedom Act"}),a+=c}else if("OK"==this.get("first_usaf_cloture_vote")){var c=1;b.push({score:c,info:"Voted NO on reauthorizing the PATRIOT Act *and* YES on cloture for the first Senate USA Freedom Act"}),a+=c}else if("BAD"==this.get("first_usaf_cloture_vote")){var c=-4;b.push({score:c,info:"Voted YES on reauthorizing the PATRIOT Act and NO on the first USA Freedom Act cloture vote"}),a+=c}if("GOOD"==this.get("straight_reauth")){var c=3;b.push({score:c,info:"Voted NO on reauthorizing the PATRIOT Act"}),a+=c}else if("BAD"==this.get("straight_reauth")){var c=-3;b.push({score:c,info:"Voted YES on reauthorizing the PATRIOT Act"}),a+=c}if("X"==this.get("fisa_reform_act")){var c=-3;b.push({score:c,info:"Supported the FISA Reform Act"}),a+=c}if("GOOD"==this.get("amendment_1449_data_retention")){var c=1;b.push({score:c,info:"Voted NO on USA Freedom data retention amendment (1449)"}),a+=c}else if("BAD"==this.get("amendment_1449_data_retention")){var c=-3;b.push({score:c,info:"Voted YES on USA Freedom data retention amendment (1449)"}),a+=c}if("GOOD"==this.get("amendment_1450_extend_implementation_to_1yr")){var c=1;b.push({score:c,info:"Voted NO on amendment 1450 extending implementation of USA Freedom Act by 1 year"}),a+=c}else if("BAD"==this.get("amendment_1450_extend_implementation_to_1yr")){var c=-2;b.push({score:c,info:"Voted YES on amendment 1450 extending implementation of USA Freedom Act by 1 year"}),a+=c}if("GOOD"==this.get("amendment_1451_gut_amicus")){var c=1;b.push({score:c,info:"Voted NO on amendment 1451 to gut amicus proceedings"}),a+=c}else if("BAD"==this.get("amendment_1451_gut_amicus")){var c=-3;b.push({score:c,info:"Voted YES on amendment 1451 to gut amicus proceedings"}),a+=c}if("GOOD"==this.get("final_passage_usaf")){var c=4;b.push({score:c,info:"Voted NO on USA Freedom Act (final passage)"}),a+=c}else if("OK"==this.get("final_passage_usaf")){var c=1;b.push({score:c,info:"Voted YES on USA Freedom Act (final passage)"}),a+=c}else if("BAD"==this.get("final_passage_usaf")){var c=-4;b.push({score:c,info:"Voted NO on USA Freedom Act (final passage) and YES on extending the PATRIOT Act"}),a+=c}if("X"==this.get("s_702_reforms")){var c=4;b.push({score:c,info:"Supported bills reforming Section 702 of FISA"}),a+=c}if("GOOD"==this.get("massie_lofgren_amendment_to_hr2685_defund_702")){var c=3;b.push({score:c,info:"Voted YES on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance"}),a+=c}else if("BAD"==this.get("massie_lofgren_amendment_to_hr2685_defund_702")){var c=-3;b.push({score:c,info:"Voted NO on Massie-Lofgren Amendment to HR2685: Defund Section 702 surveillance"}),a+=c}if("GOOD"==this.get("massie_lofgren_amendment_to_hr4870_no_backdoors")){var c=3;b.push({score:c,info:"Voted YES on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors"}),a+=c}else if("BAD"==this.get("massie_lofgren_amendment_to_hr4870_no_backdoors")){var c=-3;b.push({score:c,info:"Voted NO on Massie-Lofgren Amendment to HR4870: Ban encryption backdoors"}),a+=c}if(a>=15)var d="A+";else if(a>=12)var d="A";else if(a>=10)var d="A-";else if(a>=9)var d="B+";else if(a>=8)var d="B";else if(a>=7)var d="B-";else if(a>=6)var d="B-";else if(a>=5)var d="C+";else if(a>=3)var d="C";else if(a>=0)var d="C-";else if(a>=-2)var d="D+";else if(a>=-7)var d="D";else if(a>=-9)var d="D-";else if("McConnell"==this.get("last_name"))var d="F-";else var d="F";this.set({score:a,grade:d,score_criteria:b})},shortenState:function(a){for(var b in STATES)if(STATES.hasOwnProperty(b)&&STATES[b]==a)return b}}),Politicians=Composer.Collection.extend({sortfn:function(a,b){return a.get("last_name")<b.get("last_name")?-1:a.get("last_name")>b.get("last_name")?1:0}}),PoliticiansStateFilter=Composer.FilterCollection.extend({state:"MA",filter:function(a){return"ALL"==this.state?!0:a.get("state_short")==this.state}}),PoliticalScoreboardView=function(a){var b=$c("div"),c=$c("label");c.textContent="Choose state:",c.htmlFor="_ps_choose_state",b.appendChild(c);var d=$c("select");d.id="_ps_choose_state";for(var e in STATES)if(STATES.hasOwnProperty(e)){var f=$c("option");f.value=e,f.textContent=STATES[e],e==a.state&&(f.selected=!0),d.appendChild(f)}b.appendChild(d);var g=$c("div");g.className="politicians",b.appendChild(g);var h=$c("div");h.className="good panel";var i=$c("h3");i.textContent="Team Internet",h.appendChild(i);var j=$c("em");j.textContent="These politicians are standing up for the free Internet and oppose mass surveillance.",h.appendChild(j);var k=$c("div");k.className="filtered",h.appendChild(k),b.appendChild(h);var l=$c("div");l.className="bad panel";var i=$c("h3");i.textContent="Team Surveillance",l.appendChild(i);var j=$c("em");j.textContent="These politicians are working to expand the surveillance state and control the Internet.",l.appendChild(j);var k=$c("div");k.className="filtered",l.appendChild(k),b.appendChild(l);var m=$c("div");m.className="meh panel";var i=$c("h3");i.textContent="Unclear",m.appendChild(i);var k=$c("div");return k.className="filtered",m.appendChild(k),b.appendChild(m),b},PoliticianView=function(a){var b=$c("div"),c=$c("div"),d=$c("button"),e=$c("img"),f=$c("span"),g=$c("button"),h=$c("h4"),i=$c("h3"),j=$c("div");return c.style.backgroundImage="url(congress/"+a.politician.image+")",c.classList.add("headshot"),a.politician.score>=6?c.classList.add("good"):a.politician.score>=0?c.classList.add("neutral"):c.classList.add("bad"),b.appendChild(c),h.textContent=a.politician.last_name,b.appendChild(h),i.textContent=a.politician.grade,b.appendChild(i),j.classList.add("rollover"),a.politician.twitter&&(d.classList.add("tweet_link"),e.src="images/tw_white.png",d.appendChild(e),f.textContent="Tweet",d.appendChild(f),j.appendChild(d)),g.classList.add("info_link"),g.textContent="Grade Info",j.appendChild(g),b.appendChild(j),b},PoliticianModalView=function(a){var b=$c("div"),c=$c("button"),d=$c("h2"),e=$c("ul");b.classList.add("modal","politician_modal"),c.classList.add("close"),c.textContent="⨉",d.textContent="How They Voted…",b.appendChild(c),b.appendChild(d);for(var f=0;f<a.positions.length;f++){var g=$c("li");g.textContent=a.positions[f].info,e.appendChild(g)}return b.appendChild(e),b},SPREADSHEET_URL="https://spreadsheets.google.com/feeds/list/1rTzEY0sEEHvHjZebIogoKO1qfTez2T6xNj0AScO6t24/default/public/values?alt=json",STATES={ALL:"All",AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"},politicians=new Politicians,geocode=null,xhr=new XMLHttpRequest;xhr.onreadystatechange=function(){if(4===xhr.readyState){for(var a=JSON.parse(xhr.response),b=0;b<a.feed.entry.length;b++){var c=a.feed.entry[b],d=new Politician;d.populateFromGoogle(c),politicians.add(d)}politicians=new PoliticiansStateFilter(politicians),checkIfFinishedWithXHRs()}},xhr.open("get",SPREADSHEET_URL,!0),xhr.send();var xhr2=new XMLHttpRequest;xhr2.onreadystatechange=function(){if(4===xhr2.readyState){var a=JSON.parse(xhr2.response);geocode=a,checkIfFinishedWithXHRs()}},xhr2.open("get","https://fftf-geocoder.herokuapp.com",!0),xhr2.send();var checkIfFinishedWithXHRs=function(){politicians.models().length&&geocode&&initializeScoreboard()},initializeScoreboard=function(){geocode.subdivisions&&geocode.subdivisions.length&&geocode.subdivisions[0].iso_code&&STATES.hasOwnProperty(geocode.subdivisions[0].iso_code)&&(politicians.state=geocode.subdivisions[0].iso_code),politicians.refresh(),document.getElementById("scoreboard_data").getElementsByClassName("spinner")[0].remove(),new PoliticalScoreboardController({collection:politicians,inject:"#scoreboard_data"})};