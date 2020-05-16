(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{125:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return o})),r.d(n,"metadata",(function(){return c})),r.d(n,"rightToc",(function(){return u})),r.d(n,"default",(function(){return l}));var t=r(1),a=r(6),s=(r(0),r(147)),o={title:"Asynchronous Data Queries",sidebar_label:"Asynchronous Data Queries"},c={id:"guides/asynchronous-data-queries",title:"Asynchronous Data Queries",description:"Recoil provides a way to map state and derived state to React components via a data flow graph.  What's really powerful is that the functions in the graph can also be asynchronous.  This makes it easy to use asynchronous functions in synchronous React component render functions.  Recoil allows you to seemlessly mix synchronous and asynchronous functions in your data flow graph of selectors.  Simply return a Promise to a value instead of the value itself from a selector `get` callback, the interface remains exactly the same.  Because these are just selectors, other selectors can also depend on them to further transform the data.",source:"@site/docs/guides/asynchronous-data-queries.md",permalink:"/docs/guides/asynchronous-data-queries",editUrl:"https://github.com/facebookexperimental/Recoil/edit/docs/docs/docs/guides/asynchronous-data-queries.md",sidebar_label:"Asynchronous Data Queries",sidebar:"someSidebar",previous:{title:"Selectors",permalink:"/docs/basic-tutorial/selectors"},next:{title:"<RecoilRoot ...props />",permalink:"/docs/api-reference/core/RecoilRoot"}},u=[{value:"Synchronous Example",id:"synchronous-example",children:[]},{value:"Asynchronous Example",id:"asynchronous-example",children:[]},{value:"Error Handling",id:"error-handling",children:[]},{value:"Queries with Parameters",id:"queries-with-parameters",children:[]},{value:"Without React Suspense",id:"without-react-suspense",children:[]}],i={rightToc:u};function l(e){var n=e.components,r=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(t.a)({},i,r,{components:n,mdxType:"MDXLayout"}),Object(s.b)("p",null,"Recoil provides a way to map state and derived state to React components via a data flow graph.  What's really powerful is that the functions in the graph can also be asynchronous.  This makes it easy to use asynchronous functions in synchronous React component render functions.  Recoil allows you to seemlessly mix synchronous and asynchronous functions in your data flow graph of selectors.  Simply return a Promise to a value instead of the value itself from a selector ",Object(s.b)("inlineCode",{parentName:"p"},"get")," callback, the interface remains exactly the same.  Because these are just selectors, other selectors can also depend on them to further transform the data."),Object(s.b)("h2",{id:"synchronous-example"},"Synchronous Example"),Object(s.b)("p",null,"For example, here is a simple synchronous atom and selector to get a user name:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const currentUserIDState = atom({\n  key: 'CurrentUserID',\n  default: 0,\n});\n\nconst currentUserNameState = selector({\n  key: 'CurrentUserName',\n  get: ({get}) => {\n    return tableOfUsers[get(currentUserIDState)].name;\n  },\n});\n\nfunction UserInfo() {\n  const userName = useRecoilValue(currentUserNameState);\n  return <div>{userName}</div>;\n}\n\nfunction MyApp() {\n  return (\n    <div>\n      <UserInfo />\n    </div>\n  );\n}\n")),Object(s.b)("h2",{id:"asynchronous-example"},"Asynchronous Example"),Object(s.b)("p",null,"If the user names were stored on some database we need to query, all we need to do is return a ",Object(s.b)("inlineCode",{parentName:"p"},"Promise")," or use an ",Object(s.b)("inlineCode",{parentName:"p"},"async")," function.  If any dependencies change, the selector will be re-evaluated and execute a new query.  The results are cached, so the query will only execute once per unique input."),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const currentUserNameQuery = selector({\n  key: 'CurrentUserName',\n  get: async ({get}) => {\n    const response = await myDBQuery({\n      userID: get(currentUserIDState),\n    });\n    return response.name;\n  },\n});\n\nfunction UserInfo() {\n  const userName = useRecoilValue(currentUserNameQuery);\n  return <div>{userName}</div>;\n}\n")),Object(s.b)("p",null,"The interface of the selector is the same, so the component using this selector doesn't need to care if it was backed with synchronous atom state, derived selector state, or asynchronous queries!"),Object(s.b)("p",null,"But, since React is synchronous, what will it render before the promise resolves?  Recoil is designed to work with React Suspense to handle pending data.  Wrapping your component with a Suspense boundary will catch any descendents that are still pending and render a fallback UI:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"function MyApp() {\n  return (\n    <React.Suspense fallback={<div>Loading...</div>}>\n      <UserInfo />\n    </React.Suspense>\n  );\n}\n")),Object(s.b)("h2",{id:"error-handling"},"Error Handling"),Object(s.b)("p",null,"But what if the request has an error?  Recoil selectors can also throw errors which will then be thrown if a component tries to use that value.  This can be caught with a React ",Object(s.b)("inlineCode",{parentName:"p"},"<ErrorBoundary>"),".  For example:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const currentUserNameQuery = selector({\n  key: 'CurrentUserName',\n  get: async ({get}) => {\n    const response = await myDBQuery({\n      userID: get(currentUserIDState),\n    });\n    if (response.error) {\n      throw response.error;\n    }\n    return response.name;\n  },\n});\n\nfunction UserInfo() {\n  const userName = useRecoilValue(currentUserNameQuery);\n  return <div>{userName}</div>;\n}\n\nfunction MyApp() {\n  return (\n    <ErrorBoundary>\n      <React.Suspense fallback={<div>Loading...</div>}>\n        <UserInfo />\n      </React.Suspense>\n    </ErrorBoundary>\n  );\n}\n")),Object(s.b)("h2",{id:"queries-with-parameters"},"Queries with Parameters"),Object(s.b)("p",null,"Sometimes you want to be able to query based on parameters that aren't just based on derived state.  For example, you may want to query based on the component props.  You can do that using the ",Object(s.b)("inlineCode",{parentName:"p"},"selectorFamily")," helper:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"const userNameQuery = selectorFamily({\n  key: 'UserName',\n  get: userID => async ({get}) => {\n    const response = await myDBQuery({userID});\n    if (response.error) {\n      throw response.error;\n    }\n    return response.name;\n  },\n});\n\nfunction UserInfo({userID}) {\n  const userName = useRecoilValue(userNameQuery(userID));\n  return <div>{userName}</div>;\n}\n\nfunction MyApp() {\n  return (\n    <ErrorBoundary>\n      <React.Suspense fallback={<div>Loading...</div>}>\n        <UserInfo userID={1}/>\n        <UserInfo userID={2}/>\n        <UserInfo userID={3}/>\n      </React.Suspense>\n    </ErrorBoundary>\n  );\n}\n")),Object(s.b)("h2",{id:"without-react-suspense"},"Without React Suspense"),Object(s.b)("p",null,"It is not necessary to use React Suspense for handling pending asynchronous selectors.  You can also use the ",Object(s.b)("inlineCode",{parentName:"p"},"useRecoilValueLoadable()")," hook to determine the status during rendering:"),Object(s.b)("pre",null,Object(s.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"function UserInfo({userID}) {\n  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));\n  switch(userNameLoadable.status) {\n    case 'hasValue':\n      return <div>{userNameLoadable.contents}</div>;\n    case 'loading':\n      return <div>Loading...</div>;\n    case 'hasError':\n      throw userNameLoadable.contents;\n  }\n}\n")))}l.isMDXComponent=!0},147:function(e,n,r){"use strict";r.d(n,"a",(function(){return p})),r.d(n,"b",(function(){return h}));var t=r(0),a=r.n(t);function s(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){s(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function u(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},s=Object.keys(e);for(t=0;t<s.length;t++)r=s[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)r=s[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var i=a.a.createContext({}),l=function(e){var n=a.a.useContext(i),r=n;return e&&(r="function"==typeof e?e(n):c({},n,{},e)),r},p=function(e){var n=l(e.components);return a.a.createElement(i.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},m=Object(t.forwardRef)((function(e,n){var r=e.components,t=e.mdxType,s=e.originalType,o=e.parentName,i=u(e,["components","mdxType","originalType","parentName"]),p=l(r),m=t,h=p["".concat(o,".").concat(m)]||p[m]||d[m]||s;return r?a.a.createElement(h,c({ref:n},i,{components:r})):a.a.createElement(h,c({ref:n},i))}));function h(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var s=r.length,o=new Array(s);o[0]=m;var c={};for(var u in n)hasOwnProperty.call(n,u)&&(c[u]=n[u]);c.originalType=e,c.mdxType="string"==typeof e?e:t,o[1]=c;for(var i=2;i<s;i++)o[i]=r[i];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);