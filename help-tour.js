const guideSteps=[
  {section:'Start here',title:'A quiet scripture reader',target:'.browse',body:'Choose a book, topic, chapter, and translation above the reading. The controls update the passage in place; the verse text below is the center of the app.'},
  {section:'Browse',title:'Book',target:'#book-select',body:'Choose a Bible book to open its first chapter automatically. The Books directory below also lets you jump straight to a book or chapter.'},
  {section:'Browse',title:'Chapter',target:'#chapter-select',body:'A selected book opens at chapter 1. Choose another chapter here; Psalms and Proverbs show their own numbered selections.'},
  {section:'Browse',title:'Topic',target:'#topic-select',body:'Choose a theme to narrow the chapter list to related passages. After choosing a topic, select a chapter; All topics returns to the full book.'},
  {section:'Browse',title:'Translation',target:'#translation-select',body:'Choose King James Version, Webster, World English, or one of the included KJV text variants. Your choice is remembered on this device.'},
  {section:'Compare',title:'Read two versions side by side',target:'#translation-select',body:'The final options compare the current KJV with Webster or World English. If another KJV text is selected, that KJV is used; if a non-KJV translation is selected, the comparison uses the default KJV.'},
  {section:'Read',title:'Read two verses (example)',target:'#book-select',body:'Try a short example: choose Genesis, then chapter 1. Genesis 1:1–2 begins: “In the beginning God created the heaven and the earth. And the earth was without form, and void…” The passage below will show each verse separately.'},
  {section:'Read',title:'The passage',target:'#selected-chapter',body:'Each numbered line is a verse. Tap or click a verse to open its closer reading; you can also select and copy text, or use the square icon in the chapter heading to select several verses.'},
  {section:'Read',title:'Chapter heading controls',target:'.chapter-heading-with-actions',body:'The arrows move to the previous or next chapter or Psalm. The star saves or removes a favorite for the whole chapter; the square toggles multi-verse selection.'},
  {section:'Read',title:'Select and save verses',target:'#selection-tools',body:'After selecting verses or highlighting text, the selection toolbar offers Favorite selected, Copy selected, Clear, and—when text is highlighted—Save highlight. Clear exits the current selection.'},
  {section:'Read',title:'Books directory',target:'#book-directory',body:'The directory lists all 66 books. Tap a book name to open it; tap its plus button to expand chapter titles and jump directly to a chapter.'},
  {section:'Saved',title:'Saved verses',target:'.header-saved-tools',body:'The star count summarizes saved items. Download exports saved verses as a ZIP; saved favorites, notes, reading marks, and highlights stay in this browser unless you export them.'},
  {section:'Saved',title:'Save or load app data',target:'#backup-menu-toggle',body:'Open the disk button’s menu to Save app or Load app. Save creates a backup file; Load restores a backup you choose from your device.'},
  {section:'Downloads',title:'Download the Bible',target:'#download-bible-zip',body:'The book icon opens the full Bible export. Choose all 66 books, or select particular books, then download the text as a ZIP.'},
  {section:'Downloads',title:'Download selected content',target:'#open-content-downloads',body:'The down arrow opens a selection export for Bible topics, devotionals, survey results, and prayers. Filter the list, select individual entries or Select visible, then download the selection.'},
  {section:'Menus',title:'Prayer menu',target:'#open-prayers',body:'The church icon opens the prayer list. Choose a prayer to read it in the main reading area; when viewing a prayer, the menu also offers a return to your previous Bible book.'},
  {section:'Menus',title:'Devotional and survey',target:'#open-experience-menu',body:'The hands icon opens two choices: Devotional opens a randomly prepared reflection, and Survey lets you shape a set of verses for a moment or need.'},
  {section:'Music',title:'Music and scores',target:'#music-note-toggle',body:'Open the music note and choose a playlist. Select a song for playback, or choose Open score PDF to reveal a separate score chooser; PDFs open as documents and never appear in the playing-song list. MIDI has previous, play/pause, next, and transpose controls; MP3 plays audio.'},
  {section:'Dictionary',title:'Word dictionary',target:'#open-kjv-dictionary',body:'Aa opens the KJV word dictionary. Search a word, choose a result, and read its definition and KJV usage information.'},
  {section:'Dictionary',title:'Bible dictionaries',target:'#open-bible-dictionary',body:'B opens Easton’s and Smith’s Bible dictionaries. Search a Bible name or term, then select an entry to read its definition.'},
  {section:'Verse details',title:'Open a verse',target:'#selected-chapter',body:'Tap a verse to open its closer-reading panel. Previous and Next move through the chapter; the scroll control reads onward through the book, and its slider changes the reading speed.'},
  {section:'Verse details',title:'Mark, favorite, highlight, copy',target:'#selected-chapter',body:'In the verse panel, Mark as read tracks your progress. Favorite saves the verse, Highlight toggles its saved highlight, and Copy puts the verse text on your clipboard.'},
  {section:'Verse details',title:'Notes and translations',target:'#selected-chapter',body:'Write a personal note and choose Save note. Expand See all translation versions to compare that verse across the available texts.'},
  {section:'Verse details',title:'Verse exports',target:'#selected-chapter',body:'The verse panel can export the current verse as an image or download a ZIP containing the available verse formats. The close button returns to the chapter.'},
  {section:'Devotional',title:'A random devotional',target:'#open-experience-menu',body:'Choose Devotional to open the separate devotional page. A fresh random theme and set of passages are prepared on load; New devotional generates another, and the download buttons export the prepared reflection.'},
  {section:'Survey',title:'Moment and need',target:'#open-experience-menu',body:'The first groups describe your moment and what would help: carrying a burden, waiting, finding a next step, giving thanks, seeking quiet, or beginning again. Choose one or more answers; the selected-count label reflects your choices.'},
  {section:'Survey',title:'Life stage and tone',target:'#open-experience-menu',body:'The next groups ask where you are in a process—starting, in the middle, choosing a next step, looking back, or unsure—and what voice you prefer: calm, direct, reflective, encouraging, or mixed.'},
  {section:'Survey',title:'Passage and timing',target:'#open-experience-menu',body:'Choose the kind of scripture that would help (story, promise, prayer, teaching, or poetry) and when you expect to read it, such as morning, a pause, before a choice, evening, or whenever needed.'},
  {section:'Survey',title:'Focus and length',target:'#open-experience-menu',body:'Choose what you want to carry away: a memorable line, a thought, a next step, a question, or simplicity. Set the result length from 5 to 25 verses, optionally add context, then submit; Random answers fills the questionnaire for you.'},
  {section:'Our Father',title:'At the bottom of the page',target:'.our-father-prayer',body:'The Our Father is at the end of the page, with each sentence on its own line. Scroll past the Books directory to find it.'},
  {section:'Touch tips',title:'On a phone',target:'#open-help-tour',body:'The guide scrolls to each real control and shows an animated tap pulse; it stays at the bottom of your screen on iPhone and Samsung. Press and hold a button for its hint, and tap a verse to open its details.'}
];
const menuDetails={
  '#open-prayers':()=>{const trigger=document.querySelector('#open-prayers'),menu=document.querySelector('#prayer-menu');const openedHere=menu.hidden;if(openedHere)trigger.click();const rows=[...menu.querySelectorAll('[role="menuitem"]')].map(item=>({title:item.textContent.trim(),detail:item.classList.contains('prayer-menu-return')?'Returns to the Bible book you were reading before entering prayer mode.':'Opens this prayer in the main reading area.'}));if(openedHere)trigger.click();return {title:'Prayer menu',intro:'These are the prayers available from the church icon. Choosing one replaces the current reading with that prayer; the return item appears while you are in prayer mode.',items:rows};},
  '#backup-menu-toggle':()=>({title:'Save / Load menu',intro:'These menu items work with local backup files. Loading restores saved app data from a file you select.',items:[{title:'Save app',detail:'Download a backup of this device’s saved verses, notes, highlights, and related local data.'},{title:'Load app',detail:'Choose a backup file on your device and restore its saved app data.'}]}),
  '#download-bible-zip':()=>({title:'Bible export menu',intro:'The full Bible download opens a separate choice panel before preparing a ZIP.',items:[{title:'Download all 66 books',detail:'Create an export containing every Bible book.'},{title:'Choose specific books',detail:'Open the book picker, select individual books, then download only those books.'},{title:'Back',detail:'Return from the book picker to the two export choices.'},{title:'Download selected books',detail:'Prepare a ZIP for the selected books; this stays disabled until at least one book is selected.'}]}),
  '#open-content-downloads':()=>({title:'Selected-content export',intro:'The download panel is organized into four tabs. Use the filter to narrow the list, select rows or Select visible, then download the chosen items.',items:[{title:'Topics',detail:'Export Bible topics with their associated chapters.'},{title:'Devotionals',detail:'Export devotional entries saved on this device.'},{title:'Survey results',detail:'Export completed survey reflections stored on this device.'},{title:'Prayers',detail:'Export prayer selections.'},{title:'Filter selections',detail:'Search within the active category.'},{title:'Select visible',detail:'Select every currently visible result in the active category.'},{title:'Download selected',detail:'Create a text export of the checked items.'}]}),
  '#open-experience-menu':()=>({title:'Devotional and Survey menu',intro:'This small menu opens one of two experiences.',items:[{title:'Devotional',detail:'Open the devotional page. A random reflection is prepared when the page loads; New devotional prepares another.'},{title:'Survey',detail:'Answer questions to gather a custom group of Bible verses.'}]}),
  '#music-note-toggle':()=>({title:'Music and score panel',intro:'The music note opens the player. Choose a score, playlist, and song; use playback controls while the panel is open.',items:[{title:'Playlist',detail:'Choose a music collection. Root files and music subfolders are listed as playlists; Open score PDF reveals document selection.'},{title:'Open score PDF',detail:'Choose this playlist option to reveal the separate PDF chooser. PDFs open as documents and are not playable tracks.'},{title:'Song',detail:'Choose a track from the active audio playlist.'},{title:'Transpose',detail:'For MIDI tracks, shift notes by semitones; imports do not need key metadata.'},{title:'Previous / Play-Pause / Next',detail:'Navigate through and play tracks. MP3 tracks use the same play control.'},{title:'Status',detail:'Shows loading, playing, paused, finished, or failure information.'},{title:'Close',detail:'Close the player panel without changing the current passage.'}]}),
  '#open-kjv-dictionary':()=>({title:'KJV word dictionary',intro:'The dictionary panel provides a search field, a word list, and a definition detail area.',items:[{title:'Search all KJV words',detail:'Type a word to filter the indexed KJV vocabulary.'},{title:'Word list',detail:'Choose a result to load its definition and usage.'},{title:'Definition detail',detail:'Read the selected entry, pronunciation, parts of speech, and KJV occurrence information when available.'},{title:'Close',detail:'Return to the reader.'}]}),
  '#open-bible-dictionary':()=>({title:'Bible dictionaries',intro:'Search Easton’s and Smith’s entries for a Bible name or term.',items:[{title:'Search a Bible name or term',detail:'Filter the dictionary entries.'},{title:'Results',detail:'Choose a matching entry.'},{title:'Entry detail',detail:'Read the dictionary definition.'},{title:'Close',detail:'Return to the reader.'}]}),
  '.chapter-heading-with-actions':()=>({title:'Chapter controls',intro:'These controls act on the current chapter.',items:[{title:'‹ Previous',detail:'Go back one chapter or Psalm; disabled at the beginning of a book.'},{title:'★ Favorite chapter',detail:'Favorite or unfavorite every verse in this chapter.'},{title:'☐ Select verses',detail:'Turn on multi-select mode. Use the checkboxes beside verses, then act on the selection.'},{title:'Play responsorial',detail:'When the selected Psalm has responsorial music, use its play button beneath the Psalm title. If several versions exist, choose one before playing.'},{title:'› Next',detail:'Go forward one chapter or Psalm; disabled at the end of a book.'}]}),
  '#selection-tools':()=>({title:'Selection toolbar',intro:'This toolbar appears after selecting verses or text.',items:[{title:'Save highlight',detail:'Save selected text as a highlight on the affected verse or verses.'},{title:'Favorite selected',detail:'Favorite all selected verses.'},{title:'Copy selected',detail:'Copy the selected verses or text.'},{title:'Clear',detail:'Clear the selection and close the selection toolbar.'}]}),
  '#book-directory':()=>({title:'Books directory',intro:'Every book has a name link and a plus/minus chapter-list toggle.',items:[{title:'Book name',detail:'Open the first chapter of that book in the reader.'},{title:'+ / −',detail:'Expand or collapse that book’s chapter-title links.'},{title:'Chapter title',detail:'Jump directly to that chapter.'},{title:'Book information',detail:'Hover, focus, or press and hold a book to see its summary and chapter/verse counts.'}]}),
  '.header-saved-tools':()=>({title:'Saved verses tools',intro:'Saved items stay on this device unless exported.',items:[{title:'Star count',detail:'Shows the current number of saved/favorited items.'},{title:'Download',detail:'Download saved verses as a ZIP, including their saved details.'},{title:'Select text',detail:'Selecting verse text reveals the contextual selection actions.'}]}),
  '#selected-chapter':()=>({title:'Verse detail panel',intro:'Tap a verse to open its detail panel. These controls apply to that verse or to its surrounding reading.',items:[{title:'Previous / Next',detail:'Move to the adjacent verse in the chapter.'},{title:'Scroll rest of this book',detail:'Open a continuous reading from this verse onward.'},{title:'Scroll speed',detail:'Adjust the continuous reader’s speed.'},{title:'Mark as read',detail:'Save or clear the read status for this verse.'},{title:'See all translation versions',detail:'Expand the translation comparison for this verse.'},{title:'Favorite / Highlight / Copy',detail:'Save a favorite, toggle a highlight, or copy the verse text.'},{title:'Your note / Save note',detail:'Write a personal note and save it on this device.'},{title:'Download image / Download ZIP',detail:'Export the verse as an image or as a ZIP of available formats.'},{title:'Close',detail:'Return to the chapter.'}]}),
  '#our-father-prayer':()=>({title:'Our Father',intro:'This prayer sits at the end of the page. Its sentences are on separate lines and it is not a scrolling banner.',items:[{title:'Read',detail:'Scroll to the bottom, after the Books directory.'}]}),
  '#open-help-tour':()=>({title:'Guide controls',intro:'Move through the animated tour or open a deeper options layer for any step.',items:[{title:'Back / Next',detail:'Move through the tour. On a keyboard, the left and right arrows work too.'},{title:'Show menu / options',detail:'Open the second layer to inspect dropdown choices and menu items.'},{title:'× Close',detail:'Close the tour. Press Escape to close it as well.'},{title:'Press and hold',detail:'On mobile, press and hold a button to show its hint.'}]})
};
const panel=document.querySelector('#help-tour');
if(panel){
  const openButton=document.querySelector('#open-help-tour');
  const closeButton=document.querySelector('#close-help-tour');
  const previousButton=document.querySelector('#help-tour-previous');
  const nextButton=document.querySelector('#help-tour-next');
  const optionsButton=document.querySelector('#help-tour-options');
  const detailsBackButton=document.querySelector('#help-tour-detail-back');
  const sectionNode=document.querySelector('#help-tour-section');
  const countNode=document.querySelector('#help-tour-count');
  const titleNode=document.querySelector('#help-tour-title');
  const bodyNode=document.querySelector('#help-tour-description');
  const progressFill=document.querySelector('#help-tour-progress-fill');
  const copyNode=panel.querySelector('.help-tour-copy');
  const actionsNode=panel.querySelector('.help-tour-actions');
  const detailsNode=document.querySelector('#help-tour-detail');
  const detailsSection=document.querySelector('#help-tour-detail-section');
  const detailsTitle=document.querySelector('#help-tour-detail-title');
  const detailsIntro=document.querySelector('#help-tour-detail-intro');
  const detailsList=document.querySelector('#help-tour-detail-list');
  const filterWrap=document.querySelector('#help-tour-detail-filter-wrap');
  const filterInput=document.querySelector('#help-tour-detail-filter');
  let stepIndex=0,highlighted=null,detailEntries=[],touchPulseTimer=0,touchPulseNode=null;
  const phoneLayout=()=>window.matchMedia('(max-width:620px)').matches;
  function clearTouchPulse(){window.clearTimeout(touchPulseTimer);touchPulseNode?.remove();touchPulseNode=null;}
  function clearHighlight(){clearTouchPulse();highlighted?.classList.remove('help-tour-highlight');highlighted=null;}
  function prepareMobileTarget(target){
    const sidebar=document.querySelector('#tool-sidebar');
    if(sidebar){
      const targetInSidebar=Boolean(target.closest('#tool-sidebar'));
      if(targetInSidebar&&sidebar.hidden)document.querySelector('#tool-sidebar-toggle')?.click();
      else if(!targetInSidebar&&!sidebar.hidden)document.querySelector('#tool-sidebar-close')?.click();
      const translationPopover=target.closest('#translation-popover');
      if(targetInSidebar&&translationPopover?.hidden)document.querySelector('#translation-toggle')?.click();
      return;
    }
    if(!phoneLayout())return;
    const topbar=document.querySelector('.topline');
    const inToolMenu=Boolean(target.closest('.topline-actions'));
    const menuIsOpen=topbar?.classList.contains('mobile-menu-open');
    if(inToolMenu!==menuIsOpen)document.querySelector('#mobile-menu-toggle')?.click();
  }
  function animatePhoneTap(target){
    if(!phoneLayout())return;
    touchPulseTimer=window.setTimeout(()=>{
      const rect=target.getBoundingClientRect();
      if(rect.bottom<0||rect.top>window.innerHeight)return;
      const marker=document.createElement('span');marker.className='help-tour-touch';marker.setAttribute('aria-hidden','true');touchPulseNode=marker;
      marker.style.left=Math.max(14,Math.min(window.innerWidth-14,rect.left+Math.min(rect.width/2,36)))+'px';
      marker.style.top=Math.max(24,Math.min(window.innerHeight-24,rect.top+Math.min(rect.height/2,28)))+'px';
      document.body.append(marker);
      window.setTimeout(()=>{if(touchPulseNode===marker){marker.remove();touchPulseNode=null;}},850);
    },480);
  }
  function showTourLayer(){detailsNode.hidden=true;copyNode.hidden=false;actionsNode.hidden=false;panel.classList.remove('showing-details');}
  function renderStep(animate=true){
    showTourLayer();const step=guideSteps[stepIndex];clearHighlight();
    if(animate){copyNode.classList.remove('is-entering');void copyNode.offsetWidth;}
    sectionNode.textContent=step.section;countNode.textContent=(stepIndex+1)+' / '+guideSteps.length;titleNode.textContent=step.title;bodyNode.textContent=step.body;
    progressFill.style.width=((stepIndex+1)/guideSteps.length*100)+'%';previousButton.disabled=stepIndex===0;nextButton.textContent=stepIndex===guideSteps.length-1?'Done':'Next';
    let target=step.target?document.querySelector(step.target):null;
    if(target&&!target.getClientRects().length&&step.target==='#selection-tools')target=document.querySelector('#selected-chapter');
    if(target)prepareMobileTarget(target);
    if(target&&target.getClientRects().length&&getComputedStyle(target).visibility!=='hidden'){
      highlighted=target;target.classList.add('help-tour-highlight');
      if(animate){target.scrollIntoView({behavior:'smooth',block:phoneLayout()?'start':'center',inline:'nearest'});animatePhoneTap(target);}
    }
    if(animate)requestAnimationFrame(()=>copyNode.classList.add('is-entering'));
  }
  function getSelectEntries(select){
    return [...select.options].map(option=>{const group=option.closest('optgroup')?.label;return {title:(group?group+' · ':'')+option.textContent.trim(),detail:(option.selected?'Currently selected. ':'')+(option.disabled?'Not available yet. ':'')+'Selecting this option updates the reader.'};});
  }
  function getMenuEntries(step,target){
    if(target instanceof HTMLSelectElement)return {title:'Dropdown options',intro:'These are the actual choices currently available in this dropdown. Use the filter to find an item, then return to the page and choose it from the control.',items:getSelectEntries(target)};
    if(step.section==='Survey'){
      const items=[...document.querySelectorAll('#message-questionnaire-form .question-group')].map(group=>({title:group.querySelector('summary')?.textContent.trim()||'Question group',detail:[...group.querySelectorAll('label span')].map(option=>option.textContent.trim()).join(' · ')}));
      const lengths=[...document.querySelectorAll('#message-questionnaire-form input[name="length"]')].map(input=>input.value);items.push({title:'Verse count',detail:lengths.join(', ')+' verses.'},{title:'Optional context',detail:'Add up to 240 characters to help tailor the verse selection.'},{title:'Random answers',detail:'Fill every survey group with a random choice.'},{title:'Find verses for me',detail:'Submit the answers and build the verse set.'});
      return {title:'Survey questions and options',intro:'Every question group and answer option in the survey is listed here. You can select one or more answers where the form allows it.',items};
    }
    if(step.section==='Devotional')return {title:'Devotional page controls',intro:'The devotional opens as its own page. These are the main controls you will find there.',items:[{title:'New devotional',detail:'Choose a fresh random theme and set of passages.'},{title:'Prepare this devotional',detail:'Build the full reflection and its questions.'},{title:'Download TXT / PDF / ZIP',detail:'Export the devotional in the selected file format.'},{title:'Tap or select passage text',detail:'Use the selection actions to highlight or comment on a passage.'},{title:'Font button',detail:'Switch between the regular page and parchment typeface.'}]};
    if(step.target==='#music-note-toggle'){
      const items=[];for(const select of document.querySelectorAll('#music-panel select')){const label=select.labels?.[0]?.textContent.trim()||select.getAttribute('aria-label')||select.id;items.push({title:label,detail:'Available choices:'});for(const option of select.options)items.push({title:'  '+option.textContent.trim(),detail:(select.hidden?'Shown after choosing Open score PDF. ':'')+(option.selected?'Currently selected. ':'')+(option.disabled?'Unavailable until the playlist loads.':'Choose this option in the music panel.')});}
      items.push({title:'Previous / Play-Pause / Next',detail:'Control the current song. These controls are hidden while Open score PDF is selected.'},{title:'Close player',detail:'Close the music panel.'});return {title:'Music controls and options',intro:'This list is read from the player’s actual dropdowns. Open score PDF reveals a separate document chooser; PDF files are not audio tracks. Filter the list to find a specific track or score.',items};
    }
    if(step.target==='#download-bible-zip'){
      const names=[...document.querySelectorAll('#book-link-list .book-link .book-name')].map(node=>node.textContent.trim());const items=[{title:'Download all 66 books',detail:'Prepare the whole Bible as a ZIP.'},{title:'Choose specific books',detail:'Open the checkbox picker.'},...names.map(name=>({title:name,detail:'Book available for a selected-books export.'})),{title:'Back / Download selected books',detail:'Return to the choices or export checked books.'}];return {title:'Bible export options',intro:'You can export the full collection or choose from the individual book list.',items};
    }
    const custom=menuDetails[step.target];if(custom)return typeof custom==='function'?custom():custom;
    if(target instanceof HTMLButtonElement){return {title:'Button details',intro:step.body,items:[{title:target.title||target.getAttribute('aria-label')||target.innerText.trim(),detail:'Activate this button in the app to perform the action described above.'}]};}
    const controls=target?[...target.querySelectorAll('button,select,summary')].filter(node=>node.getClientRects().length):[];
    const items=controls.map(node=>({title:node instanceof HTMLSelectElement?'Dropdown · '+node.getAttribute('aria-label'):node.title||node.getAttribute('aria-label')||node.textContent.trim(),detail:node instanceof HTMLSelectElement?'Open this dropdown to see its '+node.options.length+' available choices.':'This control is part of the current app area.'}));
    return {title:'More details',intro:step.body,items:items.length?items:[{title:step.title,detail:step.body}]};
  }
  function renderDetailEntries(entries){
    const fragment=document.createDocumentFragment();
    for(const entry of entries){const item=document.createElement('article');item.className='help-tour-option';const title=document.createElement('strong');title.textContent=entry.title;const detail=document.createElement('p');detail.textContent=entry.detail||'';item.append(title,detail);fragment.append(item);}
    if(!entries.length){const empty=document.createElement('p');empty.className='help-tour-empty';empty.textContent='No matching options.';fragment.append(empty);}detailsList.replaceChildren(fragment);
  }
  function showDetails(){
    const step=guideSteps[stepIndex],target=step.target?document.querySelector(step.target):null;const info=getMenuEntries(step,target);
    detailEntries=info.items||[];detailsSection.textContent=step.section+' · '+(stepIndex+1)+' / '+guideSteps.length;detailsTitle.textContent=info.title||step.title;detailsIntro.textContent=info.intro||step.body;detailsList.replaceChildren();filterInput.value='';filterWrap.hidden=detailEntries.length<9;
    renderDetailEntries(detailEntries);copyNode.hidden=true;actionsNode.hidden=true;detailsNode.hidden=false;panel.classList.add('showing-details');detailsBackButton.focus({preventScroll:true});
  }
  function closeTour(){panel.hidden=true;clearHighlight();openButton?.focus({preventScroll:true});}
  function openTour(){stepIndex=0;panel.hidden=false;renderStep(true);nextButton.focus({preventScroll:true});}
  openButton?.addEventListener('click',openTour);
  closeButton.addEventListener('click',closeTour);
  detailsBackButton.addEventListener('click',()=>{showTourLayer();nextButton.focus({preventScroll:true});});
  optionsButton.addEventListener('click',showDetails);
  filterInput.addEventListener('input',()=>{const query=filterInput.value.trim().toLocaleLowerCase();renderDetailEntries(detailEntries.filter(item=>(item.title+' '+item.detail).toLocaleLowerCase().includes(query)));});
  previousButton.addEventListener('click',()=>{if(stepIndex>0){stepIndex--;renderStep(true);}});
  nextButton.addEventListener('click',()=>{if(stepIndex<guideSteps.length-1){stepIndex++;renderStep(true);}else closeTour();});
  document.addEventListener('keydown',event=>{if(panel.hidden)return;if(event.key==='Escape'){if(!detailsNode.hidden){showTourLayer();nextButton.focus({preventScroll:true});}else closeTour();}else if(detailsNode.hidden&&event.key==='ArrowRight'&&stepIndex<guideSteps.length-1){stepIndex++;renderStep(true);}else if(detailsNode.hidden&&event.key==='ArrowLeft'&&stepIndex>0){stepIndex--;renderStep(true);}});
}
