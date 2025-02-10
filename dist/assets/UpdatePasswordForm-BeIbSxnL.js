import{k as c,C as _,f as i,b as o,e as g,a as e,u as r,w as m,T as y,o as w,d as v,g as x}from"./app-DnPmZ5rD.js";import{a as l,b as n,_ as d}from"./TextInput-D-RuhqZP.js";import{P as k}from"./PrimaryButton-Dce-Gwam.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const V={class:"flex content-between items-center gap-4 w-full"},b={class:"bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 w-full"},P={class:"flex items-center gap-4 justify-end"},S={key:0,class:"text-sm text-gray-600 dark:text-gray-400"},T={__name:"UpdatePasswordForm",setup(C){const u=c(null),p=c(null),s=_({current_password:"",password:"",password_confirmation:""}),f=()=>{s.put(route("password.update"),{preserveScroll:!0,onSuccess:()=>s.reset(),onError:()=>{s.errors.password&&(s.reset("password","password_confirmation"),u.value.focus()),s.errors.current_password&&(s.reset("current_password"),p.value.focus())}})};return(N,a)=>(w(),i("section",V,[a[4]||(a[4]=o("header",{class:"w-[40%]"},[o("h2",{class:"text-lg font-medium text-gray-900 dark:text-gray-100"}," Update Password "),o("p",{class:"mt-1 text-sm text-gray-600 dark:text-gray-400"}," Ensure your account is using a long, random password to stay secure. ")],-1)),o("div",b,[o("form",{onSubmit:g(f,["prevent"]),class:"mt-6 space-y-6"},[o("div",null,[e(d,{for:"current_password",value:"Current Password"}),e(l,{id:"current_password",ref_key:"currentPasswordInput",ref:p,modelValue:r(s).current_password,"onUpdate:modelValue":a[0]||(a[0]=t=>r(s).current_password=t),type:"password",class:"mt-1 block w-full",autocomplete:"current-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.current_password,class:"mt-2"},null,8,["message"])]),o("div",null,[e(d,{for:"password",value:"New Password"}),e(l,{id:"password",ref_key:"passwordInput",ref:u,modelValue:r(s).password,"onUpdate:modelValue":a[1]||(a[1]=t=>r(s).password=t),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.password,class:"mt-2"},null,8,["message"])]),o("div",null,[e(d,{for:"password_confirmation",value:"Confirm Password"}),e(l,{id:"password_confirmation",modelValue:r(s).password_confirmation,"onUpdate:modelValue":a[2]||(a[2]=t=>r(s).password_confirmation=t),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.password_confirmation,class:"mt-2"},null,8,["message"])]),o("div",P,[e(k,{disabled:r(s).processing},{default:m(()=>a[3]||(a[3]=[v("Save")])),_:1},8,["disabled"]),e(y,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:m(()=>[r(s).recentlySuccessful?(w(),i("p",S," Saved. ")):x("",!0)]),_:1})])],32)])]))}};export{T as default};
