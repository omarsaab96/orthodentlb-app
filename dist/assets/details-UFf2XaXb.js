import{y as I,k as H,C as G,q as Y,f as n,a as x,u as v,w as b,F as k,o as c,m as J,b as e,d as i,t as a,g as y,n as u,P as L,i as K,v as Q,z as D,W as R}from"./app-DnPmZ5rD.js";import{_ as X}from"./stlfile-BJumaXAz.js";import{_ as ee}from"./AuthenticatedLayout-CjVgOwjX.js";import{_ as te,a as se,D as re}from"./Modal-DgNT3lP4.js";import{$ as r}from"./jquery-DpyqxSIO.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const oe={class:"flex flex-col justify-between"},de={class:"text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200 mb-5 flex items-center"},ae={key:0,class:"ml-[10px] bg-[#c6c656] text-[#916106] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]"},le={key:1,class:"ml-[10px] bg-[#c65656] text-[#910606] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]"},ie={class:"py-12"},ne={class:"mx-auto max-w-7xl sm:px-6 lg:px-8 flex-col flex md:flex-row gap-4 md:gap-4 mb-[50px]"},ce={class:"p-6 text-gray-900 dark:text-gray-100"},ue={class:"font-semibold text-[20px] max-w-[calc(100%-150px)]"},pe={class:"flex items-center"},xe={class:"flex items-center orderStatusContainer"},be={key:0,class:"w-[20px] mr-[10px] loader"},ge={key:0,class:"flex items-center ml-[20px]"},me={class:"mr-[20px]"},fe={class:"flex flex-col mb-[50px]"},he={class:"mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400"},ve={class:"border-b border-1 border-solid border-gray-600"},ye={class:"align-top pr-[10px]"},we=["innerHTML"],ke={class:"border-b border-1 border-solid border-gray-600"},_e={class:"pr-[10px]"},Se={class:"border-b border-1 border-solid border-gray-600"},Ce=["innerHTML"],De={class:"border-1 border-solid border-gray-600"},Te=["innerHTML"],Oe={class:"uploadedFilesDiv"},$e={class:"text-[18px] leading-[18px] flex items-center"},He={class:"mr-[10px]"},Le={class:"pt-2"},Me=["href"],Be={class:"flex justify-between items-center"},je={class:"w-[calc(100%-40px)]"},Fe={class:"flex items-center w-full"},Ue={class:"fileOriginalName mr-[10px] w-full whitespace-nowrap overflow-hidden text-ellipsis text-[18px] leading-[22px]"},Ne={class:"fileSize text-right w-[100px] dark:text-white-700 text-[16px] leading-[16px]"},ze={class:"mx-auto max-w-7xl sm:px-6 lg:px-8"},Ae={class:"text-white text-[20px] mb-[20px] flex items-center justify-between"},Ve={class:"font-semibold"},qe={class:"text-gray-500 text-[14px] leading-[14px]"},Pe={class:"font-semibold"},We={class:"flex gap-[15px] flex-wrap"},Ze={class:"flex flex-col mb-[10px]"},Ee={class:"text-[18px] leading-[20px]"},Ie={class:"block font-bold mb-[5px]"},Ge=["innerHTML"],Ye={class:"hidden uploadedFilesDiv"},Je={class:"text-[14px] leading-[16px] flex items-center"},Ke={class:"mr-[10px]"},Qe={class:"uploadedFilesUl pt-2 hide transition"},Re=["href"],Xe={class:"flex justify-between items-center"},et={class:"w-[calc(100%-30px)]"},tt={class:"flex items-center w-full"},st={class:"fileOriginalName mr-[10px] w-full whitespace-nowrap overflow-hidden text-ellipsis text-[14px] leading-[16px]"},rt={class:"fileSize text-right w-[100px] dark:text-white-700 text-[12px] leading-[12px]"},ot={key:0,class:"text-center text-white italic text-[14px]"},dt={class:"p-6"},at={class:"text-lg font-medium text-gray-900 dark:text-gray-100"},lt={class:"font-bold"},it={class:"mt-1 mb-8 text-sm text-gray-600 dark:text-gray-400"},nt={class:"border-b border-t border-1 border-solid border-gray-600"},ct={class:"pr-[10px]"},ut={class:"border-b border-t border-1 border-solid border-gray-600"},pt={class:"align-top pr-[10px]"},xt={class:"border-b border-1 border-solid border-gray-600"},bt={class:"pr-[10px]"},gt={class:"border-b border-1 border-solid border-gray-600"},mt={class:"pr-[10px]"},ft={class:"border-b border-1 border-solid border-gray-600"},ht={class:"pr-[10px]"},vt={class:"border-b border-1 border-solid border-gray-600"},yt={class:"pr-[10px]"},wt={class:"mt-6 flex justify-end"},Ot={__name:"details",props:{order:{type:Object,required:!0},relatedOrders:{type:Array,required:!0}},setup(d){const M=I("$swal"),l=d,p=H(!1),_=H(!1),f=G({id:l.order.id,linked:l.order.linked}),B=()=>{p.value=!0,f.put(route("editOrder"),{preserveScroll:!0,onSuccess:()=>{p.value=!1,f.value={id:l.order.id,linked:l.order.linked}},onError:s=>console.log(s),onFinish:()=>f.reset()})},j=()=>{_.value=!0},F=()=>{p.value=!0,axios.delete("/api/deleteOrder/"+l.order.id,{headers:{"Content-Type":"application/json"}}).then(s=>{S(),R.get("/orders")}).catch(s=>{console.log(s)})},S=()=>{_.value=!1,p.value=!1},C=s=>{if(typeof s!="string"&&(s=String(s)),s.includes("T")){const m=new Date(s),V=String(m.getUTCDate()).padStart(2,"0"),q=String(m.getUTCMonth()+1).padStart(2,"0"),P=m.getUTCFullYear(),W=String(m.getUTCHours()).padStart(2,"0"),Z=String(m.getUTCMinutes()).padStart(2,"0"),E=String(m.getUTCSeconds()).padStart(2,"0");s=`${V}${q}${P}${W}${Z}${E}`}const t=s.substring(0,2),h=s.substring(2,4)-1,o=s.substring(4,8),w=s.substring(8,10),g=s.substring(10,12),N=s.substring(12,14),O=new Date(Date.UTC(o,h,t,w,g,N)),$=Intl.DateTimeFormat().resolvedOptions().timeZone,z=O.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",timeZone:$}),A=O.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0,timeZone:$});return`<div class="flex"><div class="date mr-[5px]">${z}</div> <div class="time">${A}</div></div>`},T=s=>(s/(1024*1024)).toFixed(2)+" MB",U=s=>{axios.post("/api/updateOrderStatus",{id:l.order.id,status:s}).then(t=>{p.value=!1}).catch(t=>{console.log(t),M.fire({icon:"error",text:"Failed to change order status!",showConfirmButton:!1}).then(h=>{window.location.reload()})})};return Y(()=>{r(".orderDetailsStatus").each(function(){r(this).css("width",r(this).outerWidth()+"px"),r(this).hasClass("active")||r(this).addClass("shrink"),r(".orderStatusContainer").removeClass("open"),r(this).click(function(){if(r(this).hasClass("active"))r(".orderStatusContainer").hasClass("open")?(r(".orderStatusContainer").removeClass("open"),r(".orderDetailsStatus:not(.active)").addClass("shrink")):(r(".orderStatusContainer").addClass("open"),r(".orderDetailsStatus").removeClass("shrink"));else{r(".orderDetailsStatus").removeClass("active"),r(this).addClass("active"),r(".orderStatusContainer").removeClass("open"),r(".orderDetailsStatus:not(.active)").addClass("shrink");let s=r(this).text().trim();switch(s){case"new":r(".containerBorder").css("border-color","#4b5563"),r(".orderHead").css("border-color","#4b5563");break;case"processing":r(".containerBorder").css("border-color","#eab308"),r(".orderHead").css("border-color","#eab308");break;case"shipped":r(".containerBorder").css("border-color","#60a5fa"),r(".orderHead").css("border-color","#60a5fa");break;case"done":r(".containerBorder").css("border-color","#22c55e"),r(".orderHead").css("border-color","#22c55e");break;case"canceled":r(".containerBorder").css("border-color","#ef4444"),r(".orderHead").css("border-color","#ef4444");break}p.value=!0,U(s)}})}),setTimeout(function(){r(".orderDetailsStatus").css("opacity","1")},500)}),(s,t)=>(c(),n(k,null,[x(v(J),{title:"Order details"}),x(ee,null,{header:b(()=>[e("div",oe,[e("h2",de,[i(" Hi, "+a(s.$page.props.auth.user.name)+"! ",1),s.$page.props.auth.user.type=="admin"?(c(),n("span",ae," admin ")):y("",!0),s.$page.props.auth.user.type=="superadmin"?(c(),n("span",le," SUDO ")):y("",!0)])])]),default:b(()=>{var h;return[e("div",ie,[e("div",ne,[e("div",{class:u(["containerBorder overflow-hidden border-solid border-2 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 w-full",{" border-gray-300 dark:border-gray-600 ":d.order.status==="new"," border-yellow-500":d.order.status==="processing"," border-blue-400":d.order.status==="shipped"," border-green-500":d.order.status==="done"," border-red-500":d.order.status==="canceled"}])},[e("div",ce,[x(v(L),{href:s.route("orders"),class:"flex text-white items-center mb-[20px] rounded-[5px] text-[14px] leading-[14px] hover:text-gray-500 transition"},{default:b(()=>t[3]||(t[3]=[e("i",{class:"mt-[2px] mr-[5px] fa-solid fa-arrow-left"},null,-1),i(" Back to orders ")])),_:1},8,["href"]),e("div",{class:u(["orderHead flex items-start justify-between pb-[10px] mb-[20px] border-b border-gray-100 dark:border-gray-600",{" border-gray-300 dark:border-gray-600 ":d.order.status==="new"," border-yellow-500 dark:border-yellow-500":d.order.status==="processing"," border-blue-400 dark:border-[#60a5fa]":d.order.status==="shipped"," border-green-500 dark:border-green-500":d.order.status==="done"," border-red-500 dark:border-red-500":d.order.status==="canceled"}])},[e("h3",ue,a(l.order.name),1),e("div",pe,[e("div",xe,[p.value?(c(),n("span",be)):y("",!0),e("div",{class:u([{active:d.order.status=="new"},"orderDetailsStatus bg-gray-300 text-gray-700"])}," new ",2),e("div",{class:u([{active:d.order.status=="processing"},"orderDetailsStatus bg-yellow-500 text-yellow-800"])}," processing ",2),e("div",{class:u([{active:d.order.status=="shipped"},"orderDetailsStatus bg-blue-400 text-blue-900"])}," shipped ",2),e("div",{class:u([{active:d.order.status=="done"},"orderDetailsStatus bg-green-500 text-green-900"])}," done ",2),e("div",{class:u([{active:d.order.status=="canceled"},"orderDetailsStatus bg-red-500 text-red-900"])}," canceled ",2)]),s.$page.props.auth.user.type=="superadmin"?(c(),n("div",ge,[e("div",me,[t[4]||(t[4]=e("label",{for:"linked",class:"cursor-pointer mr-[5px]"},"isLinked",-1)),K(e("input",{id:"linked","onUpdate:modelValue":t[0]||(t[0]=o=>v(f).linked=o),type:"checkbox","true-value":"1","false-value":"0",class:"form-checkbox",onChange:t[1]||(t[1]=o=>B())},null,544),[[Q,v(f).linked]])]),e("div",null,[e("a",{href:"javascript:;",onClick:t[2]||(t[2]=o=>j()),class:"rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"}," delete ")])])):y("",!0)])],2),e("div",fe,[e("table",he,[e("tr",ve,[t[5]||(t[5]=e("td",{class:"align-top w-[150px] font-semibold"},"Description",-1)),e("td",ye,[e("span",{innerHTML:l.order.description??"<i>no description</i>"},null,8,we)])]),e("tr",ke,[t[7]||(t[7]=e("td",{class:"w-[150px] font-semibold"},"Created by",-1)),e("td",_e,[i("Dr. "+a(l.order.created_by),1),t[6]||(t[6]=e("br",null,null,-1))])]),e("tr",Se,[t[8]||(t[8]=e("td",{class:"w-[150px] font-semibold"},"Created on:",-1)),e("td",{class:"pr-[10px]",innerHTML:C(d.order.created_at)},null,8,Ce)]),e("tr",De,[t[9]||(t[9]=e("td",{class:"w-[15 0px] font-semibold"},"Last updated on:",-1)),e("td",{class:"pr-[10px]",innerHTML:C(d.order.updated_at)},null,8,Te)])])]),e("div",Oe,[e("div",$e,[e("span",He,"Attached files ("+a((h=d.order.attachments)==null?void 0:h.length)+")",1)]),e("ul",Le,[(c(!0),n(k,null,D(d.order.attachments,o=>(c(),n("li",{key:o.id,class:"p-[5px] block w-full rounded-[5px] dark:text-white transition hover:bg-gray-900"},[e("a",{href:o.file_path},[e("div",Be,[t[10]||(t[10]=e("div",{class:"mr-[10px] w-[20px]"},[e("img",{class:"w-[20px]",src:X,alt:""})],-1)),e("div",je,[e("div",Fe,[e("div",Ue,a(o.originalName),1),e("div",Ne,a(T(o.size)),1)])])])],8,Me)]))),128))])])])],2)]),e("div",ze,[e("h4",Ae,[e("div",null,[t[11]||(t[11]=i("More orders created by ")),e("span",Ve,a(d.order.created_by==null?"unknown":d.order.created_by),1)]),e("div",qe,[e("span",Pe,a(l.relatedOrders.length),1),i(" item"+a(l.relatedOrders.length!=1?"s":""),1)])]),e("ul",We,[(c(!0),n(k,null,D(l.relatedOrders,o=>{var w;return c(),n("li",{key:o.id,class:u([{"border-gray-300 dark:border-gray-600 ":o.status==="new","border-yellow-500 border-opacity-50":o.status==="processing","border-blue-400 border-opacity-50":o.status==="shipped","border-green-500 border-opacity-50":o.status==="done","border-red-500 border-opacity-50":o.status==="canceled"},"p-2 relative last:mb-0 block w-[calc(33.333333%-10px)] rounded-[10px] border-2 shadow-sm dark:bg-gray-700 dark:text-white"])},[e("div",{class:u([{"bg-white text-gray-700":o.status==="new","bg-yellow-500 text-yellow-800":o.status==="processing","bg-blue-400 text-blue-900":o.status==="shipped","bg-green-500 text-green-900":o.status==="done","bg-red-500  text-red-900":o.status==="canceled"},"absolute top-2 right-[8px] p-[2px] px-[5px] rounded-[5px] font-bold text-[12px] leading-[12px]"])},a(o.status),3),e("div",Ze,[e("div",Ee,[e("span",Ie,a(o.name),1)]),e("div",{class:"flex items-center dark:text-white-700 text-[14px] leading-[14px]",innerHTML:C(o.created_at)},null,8,Ge)]),e("div",Ye,[e("div",Je,[e("span",Ke,"Attached files ("+a((w=o.attachments)==null?void 0:w.length)+")",1),t[12]||(t[12]=e("a",{href:"javascript:;",class:"uploadedFileToggle hover:text-gray-900 transition text-[12px] leading-[16px]"},[i(" Show files "),e("i")],-1))]),e("ul",Qe,[(c(!0),n(k,null,D(o.attachments,g=>(c(),n("li",{key:g.id,class:"p-[5px] block w-full rounded-[5px] dark:text-white transition hover:bg-gray-900"},[e("a",{href:g.file_path},[e("div",Xe,[t[13]||(t[13]=e("div",{class:"mr-[10px] w-[15px]"},[e("img",{class:"w-[15px]",src:"/images/stlfile.svg",alt:""})],-1)),e("div",et,[e("div",tt,[e("div",st,a(g.originalName),1),e("div",rt,a(T(g.size)),1)])])])],8,Re)]))),128))])]),x(v(L),{href:s.route("orders.details",{id:o.id}),class:"block text-right p-[2px] rounded-[5px] font-bold text-[14px] leading-[14px]"},{default:b(()=>t[14]||(t[14]=[i(" View details "),e("i",{class:"text-white ml-[5px] fa-solid fa-arrow-right"},null,-1)])),_:2},1032,["href"])],2)}),128)),l.relatedOrders.length==0?(c(),n("li",ot," No orders ")):y("",!0)])])])]}),_:1}),x(te,{show:_.value,onClose:S},{default:b(()=>[e("div",dt,[e("h2",at,[t[15]||(t[15]=i(" Are you sure you want to delete order ? ")),t[16]||(t[16]=e("br",null,null,-1)),t[17]||(t[17]=e("br",null,null,-1)),e("span",lt,"ID: "+a(l.order.id),1)]),e("table",it,[e("tr",nt,[t[19]||(t[19]=e("td",{class:"w-[130px] font-semibold"},"Patient name",-1)),e("td",ct,[i(a(l.order.name),1),t[18]||(t[18]=e("br",null,null,-1))])]),e("tr",ut,[t[21]||(t[21]=e("td",{class:"align-top w-[130px] font-semibold"},"Description",-1)),e("td",pt,[i(a(l.order.description),1),t[20]||(t[20]=e("br",null,null,-1))])]),e("tr",xt,[t[23]||(t[23]=e("td",{class:"w-[130px] font-semibold"},"Created by",-1)),e("td",bt,[i("Dr. "+a(l.order.created_by),1),t[22]||(t[22]=e("br",null,null,-1))])]),e("tr",gt,[t[25]||(t[25]=e("td",{class:"w-[130px] font-semibold"},"Status",-1)),e("td",mt,[i(a(l.order.status),1),t[24]||(t[24]=e("br",null,null,-1))])]),e("tr",ft,[t[26]||(t[26]=e("td",{class:"w-[130px] font-semibold"},"Attachments",-1)),e("td",ht,a(l.order.attachments.length)+" "+a(l.order.attachments.length==1?"file":"files"),1)]),e("tr",vt,[t[28]||(t[28]=e("td",{class:"w-[130px] font-semibold"},"isLinked",-1)),e("td",yt,[i(a(l.order.linked==0?"false":"true"),1),t[27]||(t[27]=e("br",null,null,-1))])])]),t[31]||(t[31]=e("p",{class:"mt-1 text-sm text-red-400"},[e("i",{class:"fa-solid fa-triangle-exclamation mr-[5px]"}),i(" Once this order is deleted, all of its resources and data will be permanently deleted. ")],-1)),e("div",wt,[x(se,{onClick:S},{default:b(()=>t[29]||(t[29]=[i(" Cancel ")])),_:1}),x(re,{class:u(["ms-3",{"opacity-25":p.value}]),disabled:p.value,onClick:F},{default:b(()=>t[30]||(t[30]=[i(" Delete Account ")])),_:1},8,["class","disabled"])])])]),_:1},8,["show"])],64))}};export{Ot as default};
