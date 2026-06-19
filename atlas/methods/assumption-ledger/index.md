---
layout: atlas_page
title: "Assumption Ledger"
permalink: /atlas/methods/assumption-ledger/
seo_description: "Public method note on naming uncertainties before they become hidden dependencies."
method_key: "Assumption Ledger"
---
<section class="atlas-section">
  <div class="container">
    <p class="eyebrow">Method note</p>
    <h1>Assumption Ledger</h1>
    <p>An assumption ledger names what a system is relying on before those dependencies disappear into habit. It keeps technical, ethical, and pedagogical claims from hardening into invisible facts.</p>
    <p>Every system has a weather it pretends not to notice. Sensor noise, room light, network reliability, participant comfort, power, language, institutional trust, the availability of the person who knows how to restart the thing: these are not background details. They are load-bearing conditions.</p>
    <p>The assumption ledger is where those conditions are allowed to speak before they become ghosts in the machine. It is a place to write down what the project is borrowing from the room, from the body, from the classroom, from the network, from the future maintainer, and from the patience of whoever has to use it next.</p>

    <h2>Typical ledger questions</h2>
    <ul class="atlas-todo">
      <li>What has actually been measured, and what is only expected?</li>
      <li>What conditions would break this claim?</li>
      <li>What requires a more careful public boundary because people, rooms, or private infrastructure are involved?</li>
      <li>What proof object would move this from promising to field-tested?</li>
    </ul>

    <h2>What an assumption sounds like</h2>
    <p>It often arrives disguised as common sense: the camera will see enough, the learner will know where to click, the machine will be calibrated, the repository will be readable, the room will be quiet, the network will hold, the consent language will be understood, the diagram will be enough. These sentences are not bad. They are simply unfinished.</p>
    <p>Once written down, an assumption becomes workable. It can be tested, softened, narrowed, designed around, or refused. Unwritten, it becomes atmosphere. It surrounds the work without ever becoming responsible to it.</p>

    <h2>What the ledger holds</h2>
    <ul class="atlas-todo">
      <li>Technical dependencies: hardware drift, firmware state, latency, file paths, browser support, calibration, power, network reachability.</li>
      <li>Human dependencies: prior knowledge, access needs, reading load, comfort with being sensed, willingness to troubleshoot, classroom time.</li>
      <li>Ethical dependencies: consent, retention, redaction, participant identifiability, public proof limits, institutional context.</li>
      <li>Pedagogical dependencies: what must be explained before the system becomes meaningful instead of merely impressive.</li>
      <li>Maintenance dependencies: who can restart, repair, update, migrate, or safely retire the work.</li>
    </ul>

    <h2>Why this belongs in a portfolio</h2>
    <p>A portfolio usually wants confidence. This method asks for accountable confidence. It lets a project say: this works under these conditions; this has been tested; this remains unknown; this should not be public; this needs one more proof object before the claim gets larger.</p>
    <p>The ledger is not a confession of weakness. It is how the work refuses false smoothness. It keeps the beautiful diagram from becoming a lie of omission.</p>

    <h2>Where it matters in the fleet</h2>
    <ul class="atlas-todo">
      <li><a href="/atlas/n/moarknobs42/">MOARkNOBS-42</a> uses it to separate bench-tested control behavior from broader reliability claims.</li>
      <li><a href="/atlas/n/humanbuffer/">Human-Buffer</a> uses it to keep perception, bias, retention, and refusal visible.</li>
      <li><a href="/atlas/n/homeauto/">homeauto</a> and <a href="/atlas/n/systems-atlas/">systems-atlas</a> need it because private topology should never be mistaken for public method.</li>
    </ul>

    <h2>Public rule</h2>
    <p>When uncertainty matters, name it. Hidden dependencies make projects look stronger than they are and harder for others to learn from safely.</p>
    <p>The public version can stay compact. It does not need to expose private topology or internal notes. But it should make the shape of uncertainty visible enough that a reader knows where trust ends and inquiry begins.</p>
  </div>
</section>

{% include method-harvest.html %}
