const lessons = [
{title:"Lesson 1 — Computing Ethics",subtitle:"ACM principles, acceptable use, terms of service, and digital etiquette",questions:[{title:"Ethical Guidance",prompt:"Which organization publishes a code of ethics for computing professionals?",options:["Association for Computing Machinery (ACM)","A local sports club","A video streaming service","A hardware store"],answer:0,feedback:"The ACM provides ethical guidance for computing professionals."},{title:"Respect Privacy",prompt:"An app shares a user's private location without permission. Which principle is violated?",options:["Respect privacy","Use more storage","Increase screen brightness","Compress files"],answer:0,feedback:"Private information should not be shared without permission."},{title:"Acceptable Use Policy",prompt:"What does an Acceptable Use Policy (AUP) describe?",options:["Rules for using a network or technology service","A list of computer prices","How to write a Python loop","A list of programming languages"],answer:0,feedback:"An AUP explains acceptable behavior on a network or service."},{title:"Digital Etiquette",prompt:"Which action demonstrates respectful online communication?",options:["Use clear, polite language","Share someone's password","Harass another user","Post private data without consent"],answer:0,feedback:"Good digital etiquette includes respectful language and protecting others."}],coding:{title:"Coding Scenario — Respect Privacy",scenario:"A program stores whether a user has given permission to share their photo. Print a message only when permission is granted.",requirements:["Use the variable permission_granted.","Use an if statement to check permission_granted.","Print 'Sharing allowed' when permission is granted."],starter:"permission_granted = True\n# Check permission before sharing",checks:[{label:"checks permission_granted",test:c=>/if\s+permission_granted(?:\s*==\s*True)?\s*:/.test(c)},{label:"prints the permission message",test:c=>/print\s*\(\s*['\"]Sharing allowed['\"]\s*\)/.test(c)}]}},
{title:"Lesson 2 — Computing Laws",subtitle:"Privacy protections, accessibility, intellectual property, and software licenses",questions:[{title:"Healthcare Privacy",prompt:"Which U.S. law protects certain patient health information?",options:["HIPAA","COPPA","GLBA","EULA"],answer:0,feedback:"HIPAA establishes protections for certain health information."},{title:"Children's Privacy",prompt:"Which law gives parents rights concerning online collection of personal information from children under 13?",options:["COPPA","HIPAA","ECPA","AUP"],answer:0,feedback:"COPPA addresses online privacy for children under 13."},{title:"Financial Privacy",prompt:"Which law addresses how covered financial institutions protect customers' personal financial information?",options:["GLBA","COPPA","EULA","Patent Act"],answer:0,feedback:"The Gramm-Leach-Bliley Act addresses privacy and safeguards for covered financial institutions."},{title:"Software Licenses",prompt:"What does EULA stand for?",options:["End-User License Agreement","Electronic User Login Account","External Upload Licensing Application","Ethical Use Law Association"],answer:0,feedback:"An EULA specifies terms for using licensed software."}],coding:{title:"Coding Scenario — Minimum Age Check",scenario:"A learning website checks whether a student is at least 13 before showing an age-based notice. This is a programming exercise, not a complete COPPA compliance system.",requirements:["Use the age variable.","Use if age < 13:","Print 'Ask a parent' for ages under 13."],starter:"age = 12\n# Display the age-based notice",checks:[{label:"checks age under 13",test:c=>/if\s+age\s*<\s*13\s*:/.test(c)},{label:"prints the notice",test:c=>/print\s*\(\s*['\"]Ask a parent['\"]\s*\)/.test(c)}]}},
{title:"Lesson 3 — Intellectual Property",subtitle:"Copyright, piracy, fair use, attribution, and Creative Commons",questions:[{title:"Intellectual Property",prompt:"Which is an example of intellectual property?",options:["An original computer program","A random password guess","An empty folder","An unplugged monitor"],answer:0,feedback:"Original creative works, including software, may be protected intellectual property."},{title:"Copyright",prompt:"When does copyright protection generally begin for an original work fixed in a tangible form?",options:["Automatically when the work is created and fixed","Only after a fee is paid","Only when a copyright symbol is displayed","Only after the work is sold"],answer:0,feedback:"Copyright generally arises automatically when an original work is fixed."},{title:"Digital Piracy",prompt:"What is digital piracy?",options:["Unauthorized copying or distribution of protected digital work","Writing your own original program","Citing a source in a report","Using licensed software according to its terms"],answer:0,feedback:"Piracy involves unauthorized use or distribution of protected work."},{title:"Creative Commons",prompt:"What should you do before reusing a Creative Commons-licensed image?",options:["Check and follow its specific license conditions","Assume all uses are unrestricted","Remove the creator's name","Claim that you created the image"],answer:0,feedback:"Creative Commons licenses have conditions that users must follow."}],coding:{title:"Coding Scenario — Give Credit",scenario:"A student program displays the title and creator of a digital artwork to practice giving attribution.",requirements:["Use title and creator.","Create credit using both variables.","Print credit."],starter:"title = 'Sunrise'\ncreator = 'Jordan'\n# Create credit as title + ' by ' + creator, then print credit",checks:[{label:"uses title and creator",test:c=>/\btitle\b/.test(c)&&/\bcreator\b/.test(c)},{label:"creates credit",test:c=>/\bcredit\s*=/.test(c)},{label:"prints credit",test:c=>/print\s*\(\s*credit\s*\)/.test(c)}]}}
];let currentLesson=0;
const chapter19PageKey='csp19-current-lesson';
try{
 const savedPage=Number(localStorage.getItem(chapter19PageKey));
 if(Number.isInteger(savedPage)&&savedPage>=0&&savedPage<=lessons.length)currentLesson=savedPage;
}catch(e){}

const answers=lessons.map(l=>Array(l.questions.length).fill(null));
const questionCorrect=lessons.map(l=>Array(l.questions.length).fill(false));
const questionAttempts=lessons.map(l=>Array(l.questions.length).fill(0));
const codingChecked=Array(lessons.length).fill(false);
const codingPassed=Array(lessons.length).fill(false);
const codeEntries=Array(lessons.length).fill('');
const chapter19ProgressKey='csp19-saved-progress-v1';
function saveProgress(){
 localStorage.setItem(chapter19ProgressKey,JSON.stringify({answers,questionCorrect,questionAttempts,codingChecked,codingPassed,codeEntries,optionOrders}));
}
function restoreProgress(){
 try{
  const p=JSON.parse(localStorage.getItem(chapter19ProgressKey)||'null');
  if(!p)return;
  lessons.forEach((lesson,i)=>{
   lesson.questions.forEach((q,qi)=>{
    const a=p.answers?.[i]?.[qi];
    if(Number.isInteger(a)&&a>=0&&a<q.options.length)answers[i][qi]=a;
    questionCorrect[i][qi]=answers[i][qi]===q.answer&&p.questionCorrect?.[i]?.[qi]===true;
    questionAttempts[i][qi]=Math.min(2,Math.max(0,Number(p.questionAttempts?.[i]?.[qi])|| (questionCorrect[i][qi]?1:0)));
    if(questionAttempts[i][qi]===0&&answers[i][qi]!==null)questionAttempts[i][qi]=1;
   });
   codeEntries[i]=typeof p.codeEntries?.[i]==='string'?p.codeEntries[i]:'';
   codingChecked[i]=p.codingChecked?.[i]===true;
   codingPassed[i]=codingChecked[i]&&p.codingPassed?.[i]===true;
   const order=p.optionOrders?.[i];
   if(Array.isArray(order)&&order.length===lesson.questions.length&&order.every((o,qi)=>Array.isArray(o)&&o.length===lesson.questions[qi].options.length&&new Set(o.map(v=>v.originalIndex)).size===o.length))optionOrders[i]=order;
  });
 }catch(e){}
}
const lessonView=document.getElementById('lessonView');
const lessonTabs=document.getElementById('lessonTabs');
const progressText=document.getElementById('progressText');
const progressBar=document.getElementById('progressBar');
const finishCard=document.getElementById('finishCard');

function escapeHtml(str){return str.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));}
function highlightPrompt(text,words=[]){let safe=escapeHtml(text);words.forEach(word=>{const escaped=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');safe=safe.replace(new RegExp(`\\b(${escaped})\\b`,'gi'),'<span class="keyword-highlight">$1</span>')});return safe;}
function shuffleArray(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function makeOptionOrders(){return lessons.map(l=>l.questions.map(q=>shuffleArray(q.options.map((text,originalIndex)=>({text,originalIndex})))));}
let optionOrders=makeOptionOrders();
restoreProgress();
function lessonReady(i){return questionAttempts[i].every(n=>n>=2)||questionAttempts[i].every((n,qi)=>n>=2||questionCorrect[i][qi]) ? codingPassed[i] : false;}
function allLessonsReady(){return lessons.every((_,i)=>lessonReady(i));}

function renderTabs(){
 lessonTabs.innerHTML=lessons.map((l,i)=>`<button class="lesson-tab ${i===currentLesson?'active':''} ${lessonReady(i)?'done':''}" data-lesson="${i}">Lesson ${i+1}</button>`).join('')+`<button class="lesson-tab ${currentLesson===lessons.length?'active':''}" id="resultsTab" ${allLessonsReady()?'':'disabled'}>Results</button>`;
 document.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>{currentLesson=Number(b.dataset.lesson);render();window.scrollTo({top:0,behavior:'smooth'});}));document.getElementById('resultsTab').addEventListener('click',()=>{if(!allLessonsReady())return;currentLesson=lessons.length;render();window.scrollTo({top:0,behavior:'smooth'});});
}

function render(){
 localStorage.setItem(chapter19PageKey,String(currentLesson));
 if(currentLesson===lessons.length&&!allLessonsReady())currentLesson=Math.max(0,lessons.findIndex((_,i)=>!lessonReady(i)));if(!Number.isInteger(currentLesson)||currentLesson<0||currentLesson>lessons.length)currentLesson=0;renderTabs(); if(currentLesson===lessons.length){showFinish();return;} const lesson=lessons[currentLesson];
 progressText.textContent=`Lesson ${currentLesson+1} of ${lessons.length}`; progressBar.style.width=`${((currentLesson+1)/lessons.length)*100}%`; finishCard.classList.add('hidden');
 let html=`<section class="card lesson-header"><h2>${lesson.title}</h2><p class="lesson-subtitle">${lesson.subtitle}</p><p><strong>Multiple choice:</strong> You have two attempts per question. A correct answer finishes the question immediately; after two incorrect attempts, the question is marked complete.</p></section>`;
 lesson.questions.forEach((q,qi)=>{const shuffled=optionOrders[currentLesson][qi]; const done=questionCorrect[currentLesson][qi]||questionAttempts[currentLesson][qi]>=2;
   html+=`<article class="card question"><div class="qtop"><h2>Question ${qi+1}: ${q.title}</h2><span class="badge">Lesson ${currentLesson+1}</span></div><p class="prompt">${highlightPrompt(q.prompt,q.highlight||[])}</p>${q.code?`<div class="code">${escapeHtml(q.code)}</div>`:''}<div class="options">${shuffled.map(item=>`<button class="option ${questionCorrect[currentLesson][qi]&&item.originalIndex===q.answer?'correct':''}" data-q="${qi}" data-o="${item.originalIndex}" ${done?'disabled':''}>${escapeHtml(item.text)}</button>`).join('')}</div><div class="feedback ${done?'good':''}" id="feedback-${qi}">${done?(questionCorrect[currentLesson][qi]?'✓ Correct — '+q.feedback:'Two attempts used. Correct answer: '+q.options[q.answer]+'. '+q.feedback):''}</div></article>`;
 });
 const c=lesson.coding;
 html+=`<section class="card coding-card"><h2>${c.title}</h2><div class="scenario"><strong>Scenario:</strong> ${c.scenario}</div><b>Your program should:</b><ul class="requirements">${c.requirements.map(r=>`<li>${r}</li>`).join('')}</ul><div class="starter">${escapeHtml(c.starter)}</div><textarea class="code-entry" id="codeEntry" spellcheck="false" placeholder="Type your Python code here...">${escapeHtml(codeEntries[currentLesson])}</textarea><button class="primary" id="checkCodeBtn">Check My Code</button><div class="feedback" id="codeFeedback"></div><div id="codeResults"></div></section>`;
 html+=`<div class="lesson-actions">${currentLesson>0?'<button class="secondary" id="backBtn">Previous Lesson</button>':''}<button class="secondary" id="clearLessonBtn" type="button">Clear This Lesson</button><button class="next-btn" id="nextBtn" ${lessonReady(currentLesson)?'':'disabled'}>${currentLesson===lessons.length-1?'View Results':'Next Lesson'}</button></div>`;
 lessonView.innerHTML=html;
 document.querySelectorAll('.option').forEach(btn=>btn.addEventListener('click',checkQuestionImmediately));
 document.getElementById('codeEntry').addEventListener('input',e=>{codeEntries[currentLesson]=e.target.value;codingChecked[currentLesson]=false;codingPassed[currentLesson]=false;document.getElementById('nextBtn').disabled=true;saveProgress();renderTabs();});
 document.getElementById('checkCodeBtn').addEventListener('click',checkCode);
 const back=document.getElementById('backBtn');if(back)back.addEventListener('click',()=>{currentLesson--;render();window.scrollTo({top:0,behavior:'smooth'});});
 document.getElementById('nextBtn').addEventListener('click',nextLesson);document.getElementById('clearLessonBtn').addEventListener('click',clearCurrentLesson);
 if(codingChecked[currentLesson])displayCodeResults();
}

function checkQuestionImmediately(e){
 const qi=Number(e.currentTarget.dataset.q),oi=Number(e.currentTarget.dataset.o),q=lessons[currentLesson].questions[qi],fb=document.getElementById(`feedback-${qi}`),buttons=[...document.querySelectorAll(`[data-q="${qi}"]`)];
 if(questionCorrect[currentLesson][qi]||questionAttempts[currentLesson][qi]>=2)return;
 answers[currentLesson][qi]=oi;
 questionAttempts[currentLesson][qi]++;
 buttons.forEach(b=>b.classList.remove('selected','correct','incorrect'));
 if(oi===q.answer){
  questionCorrect[currentLesson][qi]=true;e.currentTarget.classList.add('correct');fb.className='feedback good';fb.textContent='✓ Correct — '+q.feedback;buttons.forEach(b=>b.disabled=true);
 }else if(questionAttempts[currentLesson][qi]>=2){
  e.currentTarget.classList.add('incorrect');fb.className='feedback bad';fb.textContent='Two attempts used. Correct answer: '+q.options[q.answer]+'. '+q.feedback;buttons.forEach(b=>b.disabled=true);
 }else{
  e.currentTarget.classList.add('incorrect');fb.className='feedback bad';fb.textContent='Not quite. You have one more attempt.';
 }
 saveProgress();updateNext();
}


let pythonRuntimePromise=null;
function loadPython(){
 if(pythonRuntimePromise)return pythonRuntimePromise;
 pythonRuntimePromise=new Promise((resolve,reject)=>{
  if(window.loadPyodide){resolve(window.loadPyodide());return;}
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js';
  script.onload=()=>window.loadPyodide().then(resolve,reject);
  script.onerror=()=>reject(new Error('Python engine could not load. Check your internet connection.'));
  document.head.appendChild(script);
 }).catch(e=>{pythonRuntimePromise=null;throw e});
 return pythonRuntimePromise;
}
const pythonTests=[
  [{permission_granted:true,expected:"Sharing allowed"},{permission_granted:false,expected:""}],
  [{age:12,expected:"Ask a parent"},{age:16,expected:""}],
  [{title:"Sunrise",creator:"Jordan",expected:"Sunrise by Jordan"},{title:"Moonlight",creator:"Alex",expected:"Moonlight by Alex"}]
];
async function checkCode(){
 const lessonIndex=currentLesson,code=codeEntries[lessonIndex],button=document.getElementById('checkCodeBtn');
 const fb=document.getElementById('codeFeedback'),results=document.getElementById('codeResults');
 const checks=lessons[lessonIndex].coding.checks.map(ch=>({label:ch.label,pass:ch.test(code)}));
 button.disabled=true;fb.className='feedback';fb.textContent='Running your Python code and checking the answer key…';results.textContent='';
 try{
  const py=await loadPython();
  // A small AST-based runner prevents imports, file access, loops, and other
  // unrelated Python features while allowing the expressions in these lessons.
  const harness=String.raw`
import ast, json, io, contextlib
source = ${JSON.stringify(code)}
tests = json.loads(${JSON.stringify(JSON.stringify(pythonTests[lessonIndex]))})
allowed = (ast.Module,ast.Assign,ast.Name,ast.Store,ast.Load,ast.Constant,ast.Expr,
           ast.Call,ast.Compare,ast.Gt,ast.GtE,ast.Lt,ast.LtE,ast.Eq,ast.NotEq,
           ast.If,ast.BoolOp,ast.And,ast.Or,ast.Not,ast.UnaryOp,ast.USub,
           ast.BinOp,ast.Add,ast.Sub,ast.Mult,ast.Div,ast.Mod,ast.Tuple,
           ast.List,ast.Pass,ast.Attribute)
result = {"runs": [], "error": ""}
try:
    tree = ast.parse(source)
    for node in ast.walk(tree):
        if not isinstance(node,allowed):
            raise ValueError("Only variables, comparisons, if/elif/else, and print() are allowed in this activity.")
        if isinstance(node,ast.Call) and not ((isinstance(node.func,ast.Name) and node.func.id in ("print","int","float","str","round")) or (isinstance(node.func,ast.Attribute) and node.func.attr=="strip" and isinstance(node.func.value,ast.Name))):
            raise ValueError("Only print(), int(), float(), str(), round(), and text.strip() calls are allowed in this activity.")
    for test in tests:
        class SetValues(ast.NodeTransformer):
            def visit_Assign(self,node):
                if len(node.targets)==1 and isinstance(node.targets[0],ast.Name):
                    name=node.targets[0].id
                    if name in test:
                        node.value=ast.Constant(value=test[name])
                return node
        test_tree=SetValues().visit(ast.parse(source))
        ast.fix_missing_locations(test_tree)
        output=io.StringIO()
        scope={"__builtins__":{"print":print,"int":int,"float":float,"str":str,"round":round}}
        with contextlib.redirect_stdout(output):
            exec(compile(test_tree,"<student>","exec"),scope,scope)
        actual=output.getvalue().strip()
        result["runs"].append({"expected":test["expected"],"actual":actual,
            "pass":actual==test["expected"],
            "inputs":{k:v for k,v in test.items() if k!="expected"}})
except Exception as exc:
    result["error"]=type(exc).__name__+": "+str(exc)
json.dumps(result)
`;
  const raw=await py.runPythonAsync(harness);
  if(currentLesson!==lessonIndex)return;
  const report=JSON.parse(raw),pass=!report.error&&checks.every(x=>x.pass)&&report.runs.length===pythonTests[lessonIndex].length&&report.runs.every(x=>x.pass);
  codingChecked[lessonIndex]=true;codingPassed[lessonIndex]=pass;
  const lines=checks.map(x=>'<div class="result-row">'+(x.pass?'✓':'○')+' '+escapeHtml(x.label)+'</div>');
  if(report.error)lines.push('<div class="result-row">Python error: '+escapeHtml(report.error)+'</div>');
  report.runs.forEach((run,i)=>{
   lines.push('<div class="result-row"><strong>Test '+(i+1)+': '+(run.pass?'✓ Passed':'✗ Needs correction')+'</strong><div>Values: '+escapeHtml(JSON.stringify(run.inputs))+'</div><div>Expected output: <code>'+escapeHtml(run.expected||'(no output)')+'</code></div><div>Your output: <code>'+escapeHtml(run.actual||'(no output)')+'</code></div></div>');
  });
  fb.className='feedback '+(pass?'good':'bad');
  fb.textContent=pass?'✓ Code passed the answer key and all output tests.':'Your program did not pass all checks. Review the output below, edit your code, and try again.';
  results.innerHTML=lines.join('');
  saveProgress();updateNext();
 }catch(e){
  if(currentLesson===lessonIndex){codingChecked[lessonIndex]=false;codingPassed[lessonIndex]=false;fb.className='feedback bad';fb.textContent='Could not run Python: '+e.message;results.textContent='Your work is saved. Try checking again.';saveProgress();updateNext();}
 }finally{button.disabled=false;}
}
function displayCodeResults(){
 const fb=document.getElementById('codeFeedback');
 fb.className='feedback '+(codingPassed[currentLesson]?'good':'');
 fb.textContent=codingPassed[currentLesson]?'✓ Code passed the answer key and output tests.':'Your previous code check did not pass. Click Check My Code to see the output tests again.';
}
function updateNext(){document.getElementById('nextBtn').disabled=!lessonReady(currentLesson);renderTabs();}
function nextLesson(){if(!lessonReady(currentLesson))return;if(currentLesson<lessons.length-1){currentLesson++;render();window.scrollTo({top:0,behavior:'smooth'});}else{currentLesson=lessons.length;render();}}
function clearCurrentLesson(){
 const i=currentLesson;
 if(!confirm('Clear Lesson '+(i+1)+'? Your other lessons will stay saved.'))return;
 answers[i].fill(null);questionCorrect[i].fill(false);questionAttempts[i].fill(0);codingChecked[i]=false;codingPassed[i]=false;codeEntries[i]='';
 optionOrders[i]=makeOptionOrders()[i];localStorage.removeItem(CHAPTER19_SENT_KEY);saveProgress();render();
}
function gradePercent(){const correct=questionCorrect.reduce((n,a)=>n+a.filter(Boolean).length,0)+codingPassed.filter(Boolean).length;const total=lessons.reduce((n,l)=>n+l.questions.length+1,0);return Math.round(correct/total*100);}
function showFinish(){
 lessonView.innerHTML='';finishCard.classList.remove('hidden');
 const correct=questionCorrect.reduce((n,a)=>n+a.filter(Boolean).length,0),possible=lessons.reduce((n,l)=>n+l.questions.length,0);
 document.getElementById('finalScore').textContent=`Score: ${gradePercent()}% — Multiple-choice: ${correct} / ${possible} correct; coding: ${codingPassed.filter(Boolean).length} / ${lessons.length} complete.`;
 document.getElementById('resultsMessage').textContent=gradePercent()===100?'Excellent work! All questions and coding activities are correct.':'Review your lesson scores below.';
 document.getElementById('resultsBreakdown').innerHTML=lessons.map((l,i)=>`<div class="result-row"><strong>Lesson ${i+1}:</strong> ${questionCorrect[i].filter(Boolean).length} / ${l.questions.length} questions correct; coding ${codingPassed[i]?'complete':'incomplete'}</div>`).join('');
 refreshSubmission();
 progressText.textContent='Results';progressBar.style.width='100%';
}
const GRADE_ENDPOINT='https://script.google.com/a/macros/benhillschools.org/s/AKfycbz9IipEcz2wq8Hbye5zC3pyuXFCW9_4PlutdfW3oRwfKcTW5jMgV3FqxNYVWupvJ8kO/exec';
const CHAPTER19_SENT_KEY='csp19-grade-submitted';
function refreshSubmission(){
 const sent=localStorage.getItem(CHAPTER19_SENT_KEY)==='1';
 const button=document.getElementById('submitResultsBtn');
 button.hidden=false;
 button.disabled=!allLessonsReady();
 button.textContent=sent?'Send Results Again':'Submit Results';
 document.getElementById('submissionStatus').textContent=sent?'A submission request was sent previously. Check your grade checker to confirm recording; you may send again if needed.':allLessonsReady()?'All three lessons complete. Submit your grade below.':'Complete every question (correct or two attempts used) and all coding challenges before submitting.';
}
document.getElementById('submitResultsBtn').addEventListener('click',async()=>{
 const status=document.getElementById('submissionStatus');
 if(!allLessonsReady()){status.textContent='Complete all three lessons before submitting.';return;}
 let student=null;
 try{student=JSON.parse(localStorage.getItem('csp19-student-info')||'null')}catch(e){}
 if(!student?.first||!student?.last||!student?.period){status.textContent='Student information is missing. Please complete the student information form.';return;}
 const button=document.getElementById('submitResultsBtn');
 button.disabled=true;status.textContent='Sending Chapter 19 score…';
 const payload={name:student.last+', '+student.first,period:student.period,chapter:'Chapter 19 | Legal and Ethical Concerns',score:gradePercent()};
 try{
  await fetch(GRADE_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});
  localStorage.setItem(CHAPTER19_SENT_KEY,'1');
  status.textContent='Submission request sent. Please check your Grade Checker or spreadsheet to confirm recording; this message does not confirm acceptance.';
  button.textContent='Send Results Again';
 }catch(e){status.textContent='Unable to send your score. Check your internet connection and try again.';}
 button.disabled=false;
});
document.getElementById('backToLabBtn').addEventListener('click',()=>{currentLesson=0;render();window.scrollTo({top:0,behavior:'smooth'});});
document.getElementById('resetBtn').addEventListener('click',()=>{if(!confirm('Reset all answers and coding work? This cannot be undone.'))return;currentLesson=0;answers.forEach(a=>a.fill(null));questionCorrect.forEach(a=>a.fill(false));questionAttempts.forEach(a=>a.fill(0));codingChecked.fill(false);codingPassed.fill(false);codeEntries.fill('');optionOrders=makeOptionOrders();localStorage.removeItem(chapter19ProgressKey);localStorage.removeItem(CHAPTER19_SENT_KEY);localStorage.removeItem(chapter19PageKey);render();window.scrollTo({top:0,behavior:'smooth'});});
try {
  render();
} catch(error) {
  console.error('Chapter 19 lab rendering failed:',error);
  currentLesson=0;
  try { render(); } catch(retryError) {
    console.error('Chapter 19 retry failed:',retryError);
    lessonView.innerHTML='<section class="card"><h2>Lessons temporarily unavailable</h2><p>Reload this page. Your saved answers have not been cleared.</p></section>';
  }
}