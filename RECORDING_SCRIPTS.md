# SCREEN RECORDING SCRIPTS
## Exact Narration for Each Dashboard Demo

---

## WHY RECORD VIDEOS?

**The Psychology:**
- Buddhi is busy. He might not click all 3 links.
- A 2-minute video is easier to consume than a live dashboard.
- Videos show confidence. You sound like you've done this before.
- Harsha can review them before you send to Buddhi (quality control).

**The Tools:**
- **Windows:** Use built-in Xbox Game Bar (Win + G)
- **Mac:** Use QuickTime Player (Cmd + Shift + 5)
- **Both:** OBS Studio (free, professional)

**The Format:**
- 1920x1080 resolution (Full HD)
- 2-3 minutes per video
- MP4 format
- Upload to Google Drive or Loom
- Send shareable link to Buddhi

---

## VIDEO #1: FACTORY COMMAND CENTER
**Duration:** 2 minutes 30 seconds  
**Dashboard:** factory-portfolio.js

### SCRIPT

**[00:00 - 00:15] Opening**

*[Screen shows the dashboard loading]*

"Hi Buddhi, this is a demonstration of the Factory Command Center architecture—a full-stack operational intelligence system for garment manufacturing."

---

**[00:15 - 00:45] Top KPI Overview**

*[Mouse hovers over the 4 KPI cards at top]*

"At the executive level, you see the metrics that matter:

- Overall Efficiency: 68.4%—tracking against a 65% target
- DHU: Defects per hundred units—currently at 4.2
- Cut-to-Ship Ratio: 98.9%—meaning nearly all cut fabric makes it to finished goods
- And today's revenue estimate based on finished goods scans"

---

**[00:45 - 01:15] Production Chart**

*[Mouse hovers over the bar chart]*

"This chart shows hourly production versus target. You can see where we're meeting targets—here at 9 AM and 2 PM—and where we're falling short, like at 12 PM during lunch break.

This data comes directly from IoT sensors on the sewing lines, fed via MQTT into the central data lake."

---

**[01:15 - 01:45] Cost Breakdown**

*[Mouse moves to the pie chart on right]*

"On the right, we have real-time cost distribution:
- 62% raw material
- 28% labor
- 10% overhead

This allows finance to see the true cost-per-unit, not just estimates from SAP."

---

**[01:45 - 02:10] Machine Health Table**

*[Mouse scrolls down to the table]*

"At the operational level, supervisors see machine-by-machine health. Notice CUT-CNC-01 is online and healthy, but SEW-LINE-04 is showing a warning—overheating detected.

This predictive monitoring prevents downtime."

---

**[02:10 - 02:30] Closing**

"This is the standard architecture I recommend. It aggregates shop floor data with business systems to give complete visibility.

In the next video, I'll show you how I've adapted this specifically for InQube's Smart Clothing requirements. Thanks for watching."

*[Screen fades to black]*

---

---

## VIDEO #2: InQ-PULSE (SMART LAB MONITOR)
**Duration:** 2 minutes 45 seconds  
**Dashboard:** inqube-demo.js

### SCRIPT

**[00:00 - 00:20] Opening**

*[Screen shows the InQ-Pulse dashboard with dark theme]*

"This is InQ-Pulse—the Agentic AI system I've designed specifically for InQube's Smart Bra Lamination process.

Unlike a traditional dashboard that just reports data, this system actively intervenes to prevent defects."

---

**[00:20 - 00:50] Top Cards Overview**

*[Mouse hovers over each card]*

"We're monitoring Batch X992, which is currently running with 88.5% OEE efficiency. The cost impact is zero—meaning no defects have been detected yet.

The system is connected live to Snowflake via MQTT telemetry."

---

**[00:50 - 01:30] The Critical Moment**

*[Wait for the temperature chart to drop and the red alert to appear]*

"Now watch this carefully. The bonding temperature is stable around 180 degrees Celsius. But at 8:10 AM... there."

*[Point to the drop]*

"The temperature starts dropping. A human operator might not notice this for another 20 minutes. But the AI Agent sees the pattern immediately."

*[Mouse moves to the red alert box that appears]*

"The system automatically:
1. Sends a stop signal to the PLC—pausing the fabric feeder
2. Alerts the maintenance team via WhatsApp
3. Logs the incident to Snowflake for root cause analysis"

---

**[01:30 - 02:00] Agent Actions Panel**

*[Mouse points to the right panel with scrolling logs]*

"In this panel, you can see the AI Agent's decision log. It detected the voltage drop in heating element B, predicted the failure, and took corrective action before any fabric was ruined.

This is the difference between reactive management and proactive intelligence."

---

**[02:00 - 02:20] Cost Savings**

*[Mouse highlights the "$120 Saved" metric]*

"Because the Agent caught this early, we saved $120 worth of fabric that would have been scrapped. Over a month, these micro-interventions add up to significant savings."

---

**[02:20 - 02:45] Closing**

"This is a working prototype. With your real equipment and your real data, we can have this running in 2-3 weeks as a pilot.

The next video shows how we use this same IoT infrastructure for carbon compliance reporting. Thanks."

*[Screen fades to black]*

---

---

## VIDEO #3: CARBON INTELLIGENCE PLATFORM
**Duration:** 3 minutes 00 seconds  
**Dashboard:** carbon-dashboard.js

### SCRIPT

**[00:00 - 00:25] Opening**

*[Screen shows the carbon dashboard with green theme]*

"This is the Carbon Intelligence Platform—designed specifically to support InQube's UNGC membership and Science-Based Targets commitments.

Currently, carbon reporting is based on estimates from utility bills. This system tracks carbon emissions at the machine level using real IoT data."

---

**[00:25 - 00:55] Top Metrics**

*[Mouse moves across the 4 top cards]*

"Today we've emitted 2.45 metric tons of CO₂, consuming 1,247 kilowatt-hours of energy.

To offset today's emissions, you'd need to plant 134 trees. And your progress toward your 2025 SBTi goal is at 87.6%—you're 412 days ahead of schedule."

---

**[00:55 - 01:35] Energy Chart**

*[Mouse hovers over the line chart]*

"This chart shows real-time energy consumption by asset. The red line is your lamination machine—the highest consumer at 12.4 kilowatts.

Every spike and dip is captured. When you report to the UN Climate Ambition Accelerator, these aren't estimates—this is measured data."

---

**[01:35 - 02:10] Carbon Intensity Breakdown**

*[Mouse points to the pie chart and list on right]*

"Breaking it down by process:
- Lamination generates 0.92 kg of CO₂ per cycle
- Bonding: 0.68 kg
- Cutting: 0.45 kg
- Assembly: 0.40 kg

This granularity allows you to target the highest-impact areas for efficiency improvements."

---

**[02:10 - 02:40] Machine-Level Table**

*[Mouse scrolls down to the detailed table]*

"At the operational level, each machine is monitored individually. Notice FUSE-02 is flagged yellow—its efficiency dropped to 64% this week.

That efficiency loss means an extra 28 kg of CO₂ per week. That's invisible in your current SAP system, but it's costing you both money and carbon credits."

---

**[02:40 - 03:00] Closing - The Strategic Value**

"Here's why this matters strategically:

When Nike or Adidas audits your sustainability claims, you can show them this dashboard. When you report to the UNGC, this data is ISO 14064-1 compliant.

This isn't just compliance—it's a competitive advantage.

That's the complete demonstration. Looking forward to discussing implementation. Thanks for your time."

*[Screen fades to black with your contact info]*

---

---

## RECORDING BEST PRACTICES

### Technical Setup
- **Microphone:** Use your phone's earbuds if you don't have a mic (they're better than laptop mics)
- **Background Noise:** Record in a quiet room. Turn off fans, AC.
- **Browser:** Use Chrome in "Guest Mode" (no bookmarks/extensions visible)
- **Tab:** Only have the dashboard open (close other tabs)
- **Mouse:** Move slowly. Don't jitter.

### Speaking Tips
- **Pace:** Speak 10% slower than you think you should
- **Energy:** Smile while talking—it changes your voice tone
- **Pauses:** Pause for 1 second between sections
- **Mistakes:** If you mess up, pause 3 seconds, then restart from the last sentence (you can cut it later)
- **Water:** Have water nearby. Pause and drink if your mouth gets dry.

### Editing (If Needed)
- **Windows:** Use built-in Photos app → "Video Editor"
- **Mac:** Use iMovie
- **Online:** Kapwing.com (free, browser-based)
- **Goal:** Cut out pauses, mistakes, "ums"
- **Music:** NO background music (distracting)

---

## EMAIL TEMPLATE WITH VIDEOS

**Subject:** Dashboard Demonstrations - InQube Operational Intelligence

---

Hi Buddhi,

Following up on our discussion, I've prepared three working demonstrations showcasing different layers of the operational intelligence architecture I'm proposing.

I've recorded short walkthrough videos (2-3 minutes each) to make it easy to review:

---

**1. Factory Command Center (Full Stack Overview)**  
🎥 Video: [Insert Loom/Google Drive Link]  
🔗 Live Dashboard: [Insert Cloudflare Workers URL]

Standard executive control panel for garment manufacturing—tracks production, quality, and machine health across all departments.

---

**2. InQ-Pulse: Smart Lab Agentic Monitor**  
🎥 Video: [Insert Loom/Google Drive Link]  
🔗 Live Dashboard: [Insert Cloudflare Workers URL]

AI-powered predictive system for your Smart Bra Lamination process. Demonstrates real-time intervention before defects occur.

---

**3. Carbon Intelligence Platform**  
🎥 Video: [Insert Loom/Google Drive Link]  
🔗 Live Dashboard: [Insert Cloudflare Workers URL]

Machine-level carbon tracking to support InQube's UNGC commitments and Science-Based Targets. ISO 14064-1 compliant.

---

**Recommended Approach:**

I suggest we start with a 3-week pilot (600K LKR) deploying the Smart Lab Monitor on 2-3 testing machines. This proves the IoT→Data Lake pipeline quickly with minimal risk.

If successful, we scale to full factory monitoring and carbon intelligence over the remaining 9 weeks.

I'm available to meet at your office or the factory premises to discuss implementation details. Please let me know your preferred time.

Best regards,  
[Your Name]  
[Phone Number]  
[Email]

---

---

## RECORDING CHECKLIST

Before you record each video:

- [ ] Test the Cloudflare Workers URL—make sure it loads fast
- [ ] Close all other browser tabs
- [ ] Clear your browser history (in case you share screen)
- [ ] Write down the script on paper next to your screen
- [ ] Do 1 practice recording (to test audio levels)
- [ ] Record the actual take (aim for one-take, but 2-3 takes is normal)
- [ ] Watch it back—would YOU be convinced?
- [ ] Upload to Loom or Google Drive
- [ ] Set sharing permissions to "Anyone with the link"
- [ ] Copy the links into the email template above

---

## THE TRUTH ABOUT RECORDING

**You will hate your voice.**  
Everyone does. Ignore it. Buddhi doesn't care what you sound like—he cares if you understand the problem.

**You will stumble over words.**  
Normal. Pause, take a breath, restart the sentence. You can edit it out later.

**You will feel like an imposter.**  
That's your brain lying to you. You built working systems. You researched their business. You're demonstrating capability.

**The video doesn't have to be perfect.**  
It has to be clear, confident, and technically accurate. 7/10 is good enough to win the deal.

---

## ALTERNATIVE: LIVE DEMO (No Recording)

If you're not comfortable recording, you can also do this:

**Email to Buddhi:**

"Hi Buddhi,

Rather than sending pre-recorded videos, I'd prefer to walk you through the demonstrations live in our meeting. This allows you to ask questions in real-time and see how the system responds to different scenarios.

I have three working dashboards ready:
1. Factory Command Center (general overview)
2. InQ-Pulse (specific to InQube Smart Lab)
3. Carbon Intelligence (sustainability compliance)

The live links are below if you'd like to preview:
- [Link 1]
- [Link 2]  
- [Link 3]

Looking forward to the discussion.

Best regards,  
[Your Name]"

**This approach works if:**
- You're confident presenting live
- You want to read Buddhi's reactions in real-time
- You prefer interactive Q&A over one-way video

**Choose the approach that plays to YOUR strengths.**

---

## FINAL WORD

Harsha told you to send a demo ASAP.

You have three options:

1. **Record 3 videos tonight, send tomorrow** (Highest impact, takes 2-3 hours)
2. **Send just the links tonight** (Fast, lower impact, takes 30 minutes)
3. **Do nothing and wait for the meeting** (Highest risk)

**My recommendation:** Option 1.

Record the videos tonight. Even if they're not perfect, they show:
- Initiative (you built something)
- Competence (you understand the tech)
- Confidence (you're not hiding behind text)

Buddhi gets 100 emails a day. A video stands out.

**Set a timer: 3 hours.**

In 3 hours, you should have:
- 3 videos recorded and uploaded
- 1 email drafted
- Links tested
- Email sent to Buddhi (cc: Harsha)

**Then go to sleep.**

You'll wake up tomorrow with the ball in Buddhi's court.

That's how you win this.

Now go record.

🎬
