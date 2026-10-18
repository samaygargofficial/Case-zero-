import { CaseDefinition } from '../../types/case';

export const CASES_7_TO_10: CaseDefinition[] = [
  // ============================================================================
  // LEVEL 7: THE MUSEUM AFTER DARK
  // ============================================================================
  {
    id: 'case-007',
    levelNumber: 7,
    code: 'CASE-007',
    title: 'The Museum After Dark',
    subtitle: 'Karnak Rotunda · Antiquity Wing',
    difficulty: 'Expert',
    timeLimitSeconds: 330,
    location: 'Hall of Pharaohs, National Antiquity Museum',
    date: 'November 29, 2026',
    timeframe: '01:00 – 02:00 AM',
    premise:
      'During a scheduled 01:15 AM security firmware reboot in the Hall of Pharaohs, the solid-gold "Ankh of Nefertari" vanished from its pressure-sensitive alabaster pedestal. Surprisingly, the infrared laser curtain surrounding the pedestal never reported a beam interruption.',
    crimeSceneDescription:
      'A cavernous sandstone hall dominated by twin granite statues of Anubis, an alabaster display plinth ringed by green infrared laser emitters, and a climate-control dehumidifier vault.',
    crimeSceneZoneNames: ['Alabaster Plinth', 'Laser Emitter Array', 'Anubis Statue Base', 'Firmware Server Rack'],
    victimItem: {
      title: 'The Golden Ankh of Nefertari',
      artistOrOwner: '19th Dynasty Royal Loan',
      yearOrCode: '1250 BCE · Artifact #EG-01',
      estimatedValue: '$31,000,000 USD',
      mediumOrType: 'Hammered electrum gold inlaid with Sinai turquoise and lapis lazuli',
      description: 'Weighs exactly 1,850 grams; rests on a calibrated micro-gram pressure plate.',
    },
    hints: [
      'How was the infrared laser grid bypassed without breaking the beam? Inspect the Adhesive Optical Prism mounts (CLUE-701).',
      'Check how the pressure plate weight was matched: inspect the 1,850g Bag of Calibrated Silica Sand (CLUE-702) and Dr. Tariq’s conservation locker (CLUE-705).',
      'Compare Systems Architect Nadia’s statement about the 01:15 reboot with the Local Console Patch Cable log (CLUE-703).',
    ],
    motiveOptions: [
      {
        id: 'm7_1',
        text: 'To secretly smelt and replace the original turquoise inlays that the Systems Architect accidentally cracked while filming an unauthorized 3D laser scan for a private buyer.',
        isCorrect: false,
      },
      {
        id: 'm7_2',
        text: 'To fulfill a $4M encrypted crypto bounty placed by a private Geneva collector before the exhibition returned to Cairo.',
        isCorrect: true,
      },
      {
        id: 'm7_3',
        text: 'To protest the museum’s lighting conservation policy.',
        isCorrect: false,
      },
      {
        id: 'm7_4',
        text: 'To frame the night watchman for sleeping on duty.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o7_1',
        text: 'Scheduled a bogus 01:15 firmware reboot on the CCTV cameras, used 45-degree optical right-angle prisms to bend the infrared laser beam around the plinth, swapped the Ankh with an 1,850g silica sandbag, and hid the artifact inside the hollow dehumidifier housing.',
        isCorrect: true,
      },
      {
        id: 'o7_2',
        text: 'Dropped from the skylight on a motorized winch cable at 01:40.',
        isCorrect: false,
      },
      {
        id: 'o7_3',
        text: 'Smashed the display glass with a brass fire extinguisher.',
        isCorrect: false,
      },
      {
        id: 'o7_4',
        text: 'Used a trained ferret to pull the Ankh through an air duct.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'nadia_koury',
        name: 'Nadia Koury',
        role: 'Lead Security Systems Architect',
        age: 34,
        portraitTheme: 'restorer',
        personality: 'Brilliant, condescending about hardware specs, and defensive.',
        relationshipToCase: 'Designed the infrared laser array and initiated the 01:15 AM CCTV firmware patch.',
        possibleMotive: 'Received a 20 BTC ($2M) advance deposit into a cold wallet from a Geneva antiquities broker.',
        initialAlibi: 'Claims she initiated the firmware patch remotely from the basement server room and never entered the Hall of Pharaohs.',
        relevantKnowledge: [
          'Knows the exact 850nm wavelength of the plinth lasers and how to deflect them with coated borosilicate prisms.',
          'Knows the exact 1,850g tare weight of the pressure sensor.',
        ],
        publicStatement:
          'I stayed in the B2 Server Room from 00:30 to 02:00 running the remote CCTV update! Besides, the Hall of Pharaohs laser grid remained 100% continuous—nobody crossed that beam.',
        privateInformation:
          'The firmware update she ran required plugging an Ethernet patch cable directly into the Junction Box inside the Hall of Pharaohs at 01:16.',
        statements: [
          {
            id: 'STMT-NK1',
            suspectId: 'nadia_koury',
            topic: 'Remote Server Room Alibi (01:00–02:00)',
            quote: 'I never left the B2 Server Room tonight; the 01:15 firmware update was executed 100% remotely.',
            timestampClaim: '00:30 – 02:00',
            locationClaim: 'B2 Server Room',
          },
          {
            id: 'STMT-NK2',
            suspectId: 'nadia_koury',
            topic: 'Optical Prism Hardware',
            quote: 'I have never ordered or handled 850nm borosilicate beam-splitting prisms.',
          },
          {
            id: 'STMT-NK3',
            suspectId: 'nadia_koury',
            topic: 'Laser Grid Integrity',
            quote: 'Because the laser receiver never lost light intensity, it is physically impossible for anyone to have reached into the plinth.',
          },
        ],
        interrogationQA: [
          {
            question: 'Could the 01:15 firmware update be done remotely from B2?',
            answer: 'Of course! Well... normally yes, unless the local bridge port in the Hall of Pharaohs needed a manual serial handshake.',
            keywords: ['remote', 'firmware', '01:15', 'server', 'patch', 'cable'],
          },
          {
            question: 'How could someone reach the plinth without breaking the laser beam?',
            answer: 'Only if they aligned dual 45-degree anti-reflective optical prisms to detour the 850nm beam around the gap—which takes calibration gear!',
            keywords: ['laser', 'beam', 'prism', 'optical', 'break'],
          },
          {
            question: 'Why was theGolden Ankh inside the Hall dehumidifier unit?',
            answer: 'You checked the dehumidifier?! I mean—someone must have planted it there to frame the engineering team!',
            keywords: ['dehumidifier', 'ankh', 'hidden', 'unit'],
          },
        ],
      },
      {
        id: 'tariq_mansour',
        name: 'Dr. Tariq Mansour',
        role: 'Chief Egyptologist',
        age: 55,
        portraitTheme: 'curator',
        personality: 'Scholarly and outraged by the desecration of the exhibit.',
        relationshipToCase: 'Curator of the Nefertari loan.',
        possibleMotive: 'Opposed the commercial tour of the artifact.',
        initialAlibi: 'Working in the Epigraphy Library on the 2nd floor with two graduate interns.',
        relevantKnowledge: [
          'Reported that Nadia Koury asked him for the exact gram weight of the Ankh (1,850g) three days ago to "calibrate the plinth sensor".',
        ],
        publicStatement:
          'Three days ago, Nadia Koury insisted I give her the exact 1,850.0-gram weight of the Ankh so she could tune the pressure sensor!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-TM1',
            suspectId: 'tariq_mansour',
            topic: 'Nadia’s Request for Exact Gram Weight',
            quote: 'Three days ago, Nadia Koury asked me for the exact 1,850-gram mass of the Golden Ankh.',
          },
        ],
        interrogationQA: [
          {
            question: 'Who knew the exact 1,850-gram weight of the Ankh?',
            answer: 'Only myself and Nadia Koury—she specifically asked me for the gram weight on Thursday.',
            keywords: ['weight', '1850', 'gram', 'sand', 'nadia'],
          },
        ],
      },
      {
        id: 'gideon_shaw',
        name: 'Gideon Shaw',
        role: 'Night Perimeter Guard',
        age: 48,
        portraitTheme: 'security',
        personality: 'Observant veteran.',
        relationshipToCase: 'Patrolled the outer colonnade.',
        possibleMotive: 'None.',
        initialAlibi: 'Locked out of the Hall of Pharaohs from 01:10 to 01:30 by Nadia’s maintenance override.',
        relevantKnowledge: [
          'Nadia sent a maintenance alert locking the Hall doors from 01:10 to 01:25 during the "firmware test".',
        ],
        publicStatement:
          'At 01:10, Nadia’s system locked the outer bronze doors for 15 minutes with a "Laser Calibration in Progress" warning.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-GS1',
            suspectId: 'gideon_shaw',
            topic: '01:10 Door Lockout Override',
            quote: 'Nadia’s console locked the Hall doors from 01:10 to 01:25 while CCTV cameras were offline for reboot.',
            timestampClaim: '01:10 – 01:25',
          },
        ],
        interrogationQA: [
          {
            question: 'Why didn’t you patrol the Hall at 01:15?',
            answer: 'Nadia’s engineering console engaged the magnetic lockout from 01:10 to 01:25 for "Firmware Calibration".',
            keywords: ['patrol', '01:15', 'lockout', 'doors', 'nadia'],
          },
        ],
      },
      {
        id: 'felix_roth',
        name: 'Felix Roth',
        role: 'Lighting Technician',
        age: 27,
        portraitTheme: 'heir',
        personality: 'Tech-savvy and nervous.',
        relationshipToCase: 'Assists with gallery optics.',
        possibleMotive: 'Small salary.',
        initialAlibi: 'In the West Wing replacing track bulbs on CCTV.',
        relevantKnowledge: [
          'Saw a package of 850nm coated right-angle prisms on Nadia’s workbench yesterday.',
        ],
        publicStatement:
          'I was on live camera in the West Wing all night! Ask Nadia why she had four 850nm optical prisms in her desk drawer yesterday.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-FR1',
            suspectId: 'felix_roth',
            topic: 'Prisms on Nadia’s Workbench',
            quote: 'I saw a box of four 850nm optical right-angle prisms in Nadia Koury’s drawer yesterday.',
          },
        ],
        interrogationQA: [
          {
            question: 'Did you see optical prisms in the museum?',
            answer: 'Yes! Nadia Koury had four borosilicate 850nm right-angle prisms in her desk drawer yesterday afternoon.',
            keywords: ['prism', 'optical', 'nadia', 'drawer'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-701',
        title: 'Cyanoacrylate Adhesive & Prism Alignment Marks',
        category: 'forensic',
        description:
          'UV fluorescence on the laser emitter bezel reveals four square adhesive marks where 45-degree optical prisms were temporarily mounted to bend the 850nm infrared beam around the center of the plinth.',
        discoveryLocation: 'Alabaster Plinth Laser Ring',
        relevantTimestamp: '01:16',
        establishes: 'The laser beam was optically detoured using right-angle prisms so the thief could reach in without triggering an alarm.',
        relatedSuspectIds: ['nadia_koury'],
        hotspotX: 48,
        hotspotY: 46,
      },
      {
        id: 'CLUE-702',
        title: '1,850.0g Calibrated Silica Sand Pouch on Plinth',
        category: 'physical',
        description:
          'Resting on the pressure plate in place of the Ankh is a heat-sealed anti-static bag filled with desiccant silica beads weighing 1,850.0 grams—weighed on the engineering lab’s precision scale.',
        discoveryLocation: 'Alabaster Plinth Pressure Plate',
        establishes: 'The thief knew the exact 1,850.0g calibration weight and used engineering lab anti-static packaging.',
        relatedSuspectIds: ['nadia_koury', 'tariq_mansour'],
        hotspotX: 52,
        hotspotY: 35,
      },
      {
        id: 'CLUE-703',
        title: 'Local Serial Port Handshake Log (Hall Junction Box)',
        category: 'log',
        description:
          'Hardware log inside the Hall of Pharaohs wall junction box proves Nadia Koury’s encrypted service laptop was physically plugged into the Hall’s local Ethernet port via a 1-meter cable from 01:14 to 01:22.',
        discoveryLocation: 'Hall of Pharaohs North Wall Port',
        relevantTimestamp: '01:14 – 01:22',
        establishes: 'Destroys Nadia’s alibi of staying in the B2 Server Room; she was physically inside the Hall of Pharaohs at 01:14.',
        relatedSuspectIds: ['nadia_koury'],
        hotspotX: 24,
        hotspotY: 58,
      },
      {
        id: 'CLUE-704',
        title: 'Optical Supply Invoice for 850nm Prisms',
        category: 'document',
        description:
          'Purchase receipt signed by Nadia Koury for four 850nm infrared anti-reflective right-angle borosilicate prisms—matching the exact wavelength of the plinth lasers.',
        discoveryLocation: 'Engineering Office Filing Cabinet',
        establishes: 'Proves Nadia Koury ordered and possessed the exact prisms used to bypass the laser curtain.',
        relatedSuspectIds: ['nadia_koury', 'felix_roth'],
        hotspotX: 78,
        hotspotY: 28,
      },
      {
        id: 'CLUE-705',
        title: 'Golden Ankh Inside Dehumidifier Condenser Tank',
        category: 'physical',
        description:
          'Concealed inside the dry acoustic baffle of the Hall’s industrial climate-control dehumidifier—locked with Nadia’s systems key—is the Golden Ankh of Nefertari wrapped in bubble wrap.',
        discoveryLocation: 'Hall of Pharaohs Dehumidifier Unit',
        establishes: 'Recovers the Golden Ankh inside a utility housing only Systems Architect Nadia Koury could unlock.',
        relatedSuspectIds: ['nadia_koury'],
        hotspotX: 82,
        hotspotY: 66,
      },
      {
        id: 'CLUE-706',
        title: 'Hardware Wallet With 20 BTC Geneva Escrow',
        category: 'document',
        description:
          'Hardware ledger in Nadia’s locker showing a 20 BTC ($2,000,000) advance deposit from an illicit Geneva antiquities syndicate for "Item #EG-01".',
        discoveryLocation: 'Systems Architect Locker',
        establishes: 'Establishes Nadia Koury’s $4M syndicate bounty motive.',
        relatedSuspectIds: ['nadia_koury'],
        hotspotX: 65,
        hotspotY: 75,
      },
      {
        id: 'CLUE-707',
        title: 'Epigraphy Library Keycard & Witness Log',
        category: 'log',
        description: 'Confirms Dr. Tariq Mansour and two interns were in the 2nd-floor library from 00:00 to 02:00.',
        discoveryLocation: '2nd Floor Epigraphy Library',
        establishes: 'Exonerates Dr. Tariq Mansour.',
        relatedSuspectIds: ['tariq_mansour'],
        hotspotX: 16,
        hotspotY: 30,
      },
      {
        id: 'CLUE-708',
        title: 'West Wing Live CCTV Recording (Felix Roth)',
        category: 'log',
        description: 'Uninterrupted West Wing camera feed shows Felix Roth on a ladder changing track lights from 01:00 to 01:45.',
        discoveryLocation: 'Security Archive',
        establishes: 'Exonerates Felix Roth.',
        relatedSuspectIds: ['felix_roth'],
        hotspotX: 35,
        hotspotY: 72,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-701',
        statementId: 'STMT-NK1',
        clueId: 'CLUE-703',
        verdict: 'CONTRADICTION',
        title: 'Laptop Physically Plugged Into Hall Junction Box (01:14)',
        explanation:
          'Nadia claimed she never left the B2 Server Room, but CLUE-703 proves her laptop was plugged via a 1-meter patch cable directly into the Hall of Pharaohs wall port from 01:14 to 01:22.',
      },
      {
        id: 'RULE-702',
        statementId: 'STMT-NK2',
        clueId: 'CLUE-704',
        verdict: 'CONTRADICTION',
        title: 'Signed Invoice for Four 850nm Optical Prisms',
        explanation:
          'Nadia denied ever ordering or handling 850nm prisms, which is directly refuted by her signed purchase receipt in CLUE-704.',
      },
      {
        id: 'RULE-703',
        statementId: 'STMT-NK3',
        clueId: 'CLUE-701',
        verdict: 'CONTRADICTION',
        title: 'Laser Curtain Detoured via Mounted Right-Angle Prisms',
        explanation:
          'Nadia claimed an unbroken receiver signal meant nobody reached into the plinth, but CLUE-701 proves 45-degree prisms detoured the beam around the center gap.',
      },
    ],
    timeline: [
      {
        id: 'T7-1',
        time: '01:10',
        displayTime: '01:10 AM',
        title: 'Hall Doors Locked Out by Maintenance Override',
        description: 'Nadia’s console seals the Hall of Pharaohs doors.',
        source: 'Guard Testimony',
        suspectId: 'nadia_koury',
        status: 'CONFIRMED',
      },
      {
        id: 'T7-2',
        time: '01:14',
        displayTime: '01:14 AM',
        title: 'Nadia Plugs Laptop Into Hall Junction Box',
        description: 'Local serial log records Nadia’s laptop inside the Hall while CCTV reboots.',
        source: 'Junction Box Log',
        suspectId: 'nadia_koury',
        clueId: 'CLUE-703',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Nadia’s B2 Server Room alibi.',
      },
      {
        id: 'T7-3',
        time: '01:16',
        displayTime: '01:16 AM',
        title: 'Prisms Mounted & Ankh Swapped with Silica Bag',
        description: 'Nadia detours the 850nm laser with prisms, swaps the Ankh with a 1,850g silica bag, and hides the Ankh in the dehumidifier.',
        source: 'Forensic Adhesive & Plinth Scale',
        suspectId: 'nadia_koury',
        clueId: 'CLUE-701',
        status: 'CONTRADICTED',
        conflictNote: 'Proves how the laser and weight sensors were defeated.',
      },
    ],
    solution: {
      culpritId: 'nadia_koury',
      culpritName: 'Nadia Koury (Lead Security Systems Architect)',
      motiveSummary:
        'Nadia accepted a $4M crypto bounty (20 BTC advance in CLUE-706) from an illicit Geneva antiquities collector.',
      opportunitySummary:
        'She scheduled a bogus 01:15 CCTV reboot and locked out the guards. While physically inside the Hall (proven by the local serial cable log in CLUE-703), she mounted four 850nm optical prisms (CLUE-701, CLUE-704) to bend the laser curtain, swapped the Ankh with a 1,850g bag of silica beads (CLUE-702), and hid the artifact inside the Hall dehumidifier unit (CLUE-705).',
      actualSequence: [
        '01:10 — Locks the Hall bronze doors under a "Laser Calibration" alert.',
        '01:14 — Plugs her laptop into the Hall junction box and takes the Hall CCTV cameras offline for reboot.',
        '01:16 — Mounts four 850nm optical prisms to detour the laser beam and swaps the Ankh with a 1,850g silica pouch.',
        '01:20 — Conceals the Golden Ankh inside the locked dehumidifier housing.',
      ],
      keyTargetLocation: 'Acoustic baffle of the industrial dehumidifier inside the Hall of Pharaohs.',
      decisiveClueIds: ['CLUE-701', 'CLUE-703', 'CLUE-704', 'CLUE-705'],
      motiveKeywords: ['btc', 'bitcoin', 'crypto', 'geneva', 'collector', 'bounty', '4m'],
      opportunityKeywords: ['prism', 'laser', 'silica', '1850', 'weight', 'dehumidifier', 'firmware', 'junction'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'tariq_mansour',
          reason: 'In the 2nd-floor library with two witnesses (CLUE-707).',
        },
        {
          suspectId: 'gideon_shaw',
          reason: 'Locked outside the bronze doors by Nadia’s override.',
        },
        {
          suspectId: 'felix_roth',
          reason: 'Recorded on live West Wing CCTV changing lightbulbs (CLUE-708).',
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 8: THE SECRET LABORATORY
  // ============================================================================
  {
    id: 'case-008',
    levelNumber: 8,
    code: 'CASE-008',
    title: 'The Secret Laboratory',
    subtitle: 'Aegis Cryogenics Cleanroom Facility',
    difficulty: 'Expert',
    timeLimitSeconds: 330,
    location: 'Cleanroom Sector 4, Aegis Quantum Labs',
    date: 'December 4, 2026',
    timeframe: '18:00 – 19:00',
    premise:
      'At 18:45, the sole crystalline wafer of "Project Helios"—the world’s first ambient-temperature superconductor—was discovered missing from its argon-filled glovebox in Cleanroom 4. Instead of the real wafer, a worthless silicon dummy sat on the magnetic levitation stage. No one exited the cleanroom airlock carrying metal.',
    crimeSceneDescription:
      'A positive-pressure ISO-1 cleanroom with yellow photolithography lighting, an argon glovebox, a liquid-nitrogen Dewar flask rack, and a metal-detecting airlock portal.',
    crimeSceneZoneNames: ['Argon Glovebox #1', 'Liquid Nitrogen Dewar #3', 'Airlock Metal Portal', 'Spectrometer Terminal'],
    victimItem: {
      title: 'Project Helios Superconductor Wafer #01',
      artistOrOwner: 'Aegis Quantum Consortium',
      yearOrCode: 'Wafer #HL-01',
      estimatedValue: '$150,000,000 R&D Valuation',
      mediumOrType: 'Copper-substituted apatite ceramic disk (diamagnetic)',
      description: 'Exhibits zero electrical resistance and Meissner levitation at room temperature.',
    },
    hints: [
      'Check why the Airlock Metal Detector didn’t trigger: either the wafer wasn’t carried out yet, OR check the Liquid Nitrogen Dewar #3 (CLUE-805) inside the Pass-Through Airlock!',
      'Compare Dr. Vance’s claim that he never opened the Argon Glovebox pass-port with the Oxygen Parts-Per-Million Spike Log (CLUE-801).',
      'Look at the Thermal Camera Residual Signature (CLUE-802) and Dr. Vance’s rival corporate contract (CLUE-806).',
    ],
    motiveOptions: [
      {
        id: 'm8_1',
        text: 'To defect to rival conglomerate Hyperion Dynamics with the working wafer for a $25M signing bonus after being denied lead patent credit.',
        isCorrect: true,
      },
      {
        id: 'm8_2',
        text: 'To prove that room-temperature superconductivity is a hoax.',
        isCorrect: false,
      },
      {
        id: 'm8_3',
        text: 'Accidental shattering of the wafer during cleaning.',
        isCorrect: false,
      },
      {
        id: 'm8_4',
        text: 'To use the wafer inside a gaming computer.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o8_1',
        text: 'Opened the argon glovebox transfer port at 18:22 (causing a 12 ppm oxygen spike), swapped the Helios wafer with a silicon blank using ceramic tweezers, and suspended the real wafer inside Cryogenic Dewar Flask #3 in the service pass-through.',
        isCorrect: true,
      },
      {
        id: 'o8_2',
        text: 'Swallowed the superconductor wafer to walk past the metal detector.',
        isCorrect: false,
      },
      {
        id: 'o8_3',
        text: 'Dissolved the wafer in acid and precipitated it in the parking lot.',
        isCorrect: false,
      },
      {
        id: 'o8_4',
        text: 'Flew a micro-drone through the HEPA ceiling filter.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'dr_keith_mercer',
        name: 'Dr. Keith Vance-Mercer',
        role: 'Senior Materials Physicist',
        age: 43,
        portraitTheme: 'curator',
        personality: 'Arrogant, bitter over patent attribution, and hyper-technical.',
        relationshipToCase: 'Synthesized the precursor ceramic but was listed second on the patent behind Director Lin.',
        possibleMotive: 'Secretly signed a $25M chief scientist offer with rival Hyperion Dynamics.',
        initialAlibi: 'Claims he only calibrated the exterior laser interferometer from 18:15 to 18:30 and never opened the Argon Glovebox.',
        relevantKnowledge: [
          'Knows that immersing the wafer in magnetic-shielded Liquid Nitrogen Dewar #3 hides its diamagnetic signature from portal scanners.',
        ],
        publicStatement:
          'I never opened the Argon Glovebox transfer port during my 18:15 shift! The oxygen purity inside that box stayed at 0.0 ppm the entire time.',
        privateInformation:
          'He opened the transfer port at 18:22 using his override code, causing a brief 14.2 ppm oxygen spike logged on the backup analyzer.',
        statements: [
          {
            id: 'STMT-KM1',
            suspectId: 'dr_keith_mercer',
            topic: 'Argon Glovebox Port Integrity',
            quote: 'I never opened the Argon Glovebox transfer port between 18:15 and 18:30; the oxygen sensor stayed at 0.0 ppm.',
            timestampClaim: '18:15 – 18:30',
          },
          {
            id: 'STMT-KM2',
            suspectId: 'dr_keith_mercer',
            topic: 'Cryogenic Dewar #3 Handling',
            quote: 'I never touched Liquid Nitrogen Dewar #3 in the hazardous material pass-through.',
          },
          {
            id: 'STMT-KM3',
            suspectId: 'dr_keith_mercer',
            topic: 'Loyalty to Aegis Quantum Labs',
            quote: 'I have had zero contact with rival firms like Hyperion Dynamics.',
          },
        ],
        interrogationQA: [
          {
            question: 'Why did the backup trace analyzer log a 14.2 ppm oxygen spike in the glovebox at 18:22?',
            answer: 'A sensor calibration drift! The argon pressure regulator sometimes burps when the HVAC cycles.',
            keywords: ['oxygen', 'ppm', '18:22', 'glovebox', 'argon', 'spike'],
          },
          {
            question: 'Why did you schedule Liquid Nitrogen Dewar #3 for external vendor pickup tonight?',
            answer: 'The vacuum jacket on Dewar #3 was losing thermal efficiency—routine maintenance!',
            keywords: ['dewar', 'nitrogen', 'pickup', 'flask', '3'],
          },
          {
            question: 'What is this $25M term sheet from Hyperion Dynamics?',
            answer: 'Every top physicist gets headhunted! That doesn’t mean I stole my own life’s work.',
            keywords: ['hyperion', '25m', 'rival', 'patent', 'contract'],
          },
        ],
      },
      {
        id: 'dr_mei_lin',
        name: 'Dr. Mei Lin',
        role: 'Cleanroom Director & Lead Inventor',
        age: 39,
        portraitTheme: 'restorer',
        personality: 'Focused, methodical, and protective of the Helios project.',
        relationshipToCase: 'Discovered the silicon dummy at 18:45 when preparing the press demonstration.',
        possibleMotive: 'None—she is the primary patent holder.',
        initialAlibi: 'In the upstairs conference room briefing the Department of Energy delegation from 17:45 to 18:40.',
        relevantKnowledge: [
          'Demonstrates that the dummy wafer came from Lot #Si-99 stored exclusively in Dr. Keith Mercer’s cleanroom locker.',
        ],
        publicStatement:
          'I was upstairs briefing the Energy Secretary until 18:40! And look at the serial laser-etch on the dummy wafer—it’s from substrate batch #Si-99 assigned to Dr. Keith Mercer!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-ML1',
            suspectId: 'dr_mei_lin',
            topic: 'Dummy Wafer Lot #Si-99',
            quote: 'The silicon dummy wafer left on the stage bears laser batch code #Si-99, issued solely to Dr. Keith Mercer.',
          },
        ],
        interrogationQA: [
          {
            question: 'Where did the silicon dummy wafer come from?',
            answer: 'The edge micro-etch reads Batch #Si-99—that box of blank wafers is kept in Dr. Keith Mercer’s locker.',
            keywords: ['dummy', 'silicon', 'wafer', 'si-99', 'batch'],
          },
        ],
      },
      {
        id: 'toby_vance',
        name: 'Toby Vance',
        role: 'Cleanroom Gowning Tech',
        age: 26,
        portraitTheme: 'heir',
        personality: 'Helpful and observant.',
        relationshipToCase: 'Monitors the airlock portal.',
        possibleMotive: 'None.',
        initialAlibi: 'At the outer airlock desk.',
        relevantKnowledge: [
          'Saw Dr. Keith Mercer wheeling Liquid Nitrogen Dewar #3 into the Hazmat Pass-Through bay at 18:26.',
        ],
        publicStatement:
          'Nobody walked through the personnel airlock carrying the wafer—the magnetic portal would have screamed. But Dr. Mercer did place Dewar #3 into the Hazmat Pass-Through bay at 18:26!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-TV1',
            suspectId: 'toby_vance',
            topic: '18:26 Dewar #3 Transfer',
            quote: 'At 18:26, I saw Dr. Mercer load Liquid Nitrogen Dewar #3 into the Hazmat Pass-Through bay.',
            timestampClaim: '18:26',
          },
        ],
        interrogationQA: [
          {
            question: 'Did Dr. Mercer handle Dewar #3?',
            answer: 'Yes! At 18:26 I watched him through the yellow glass wheeling Dewar #3 into the Hazmat Pass-Through.',
            keywords: ['dewar', '18:26', 'mercer', 'hazmat'],
          },
        ],
      },
      {
        id: 'captain_reed',
        name: 'Capt. Elena Reed',
        role: 'Facility Security Officer',
        age: 45,
        portraitTheme: 'security',
        personality: 'Strict and vigilant.',
        relationshipToCase: 'Locked down the facility at 18:46.',
        possibleMotive: 'None.',
        initialAlibi: 'At the main security gate.',
        relevantKnowledge: [
          'Intercepted an unscheduled courier van from "Cryo-Serv Logistics" (a shell owned by Hyperion) arriving to pick up Dewar #3.',
        ],
        publicStatement: 'We stopped a courier van at the gate sent to pick up Dewar #3 on a work order signed by Dr. Keith Mercer!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-CR1',
            suspectId: 'captain_reed',
            topic: 'Intercepted Dewar Pickup Order',
            quote: 'Dr. Keith Mercer signed an urgent 19:00 external pickup order for Dewar #3.',
          },
        ],
        interrogationQA: [
          {
            question: 'How was the thief planning to get the wafer out of the building?',
            answer: 'Inside Dewar #3! Dr. Mercer signed a 19:00 hazmat pickup slip to have Dewar #3 loaded onto an external courier truck.',
            keywords: ['truck', 'pickup', 'dewar', 'out', 'mercer'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-801',
        title: 'Glovebox Trace Oxygen Analyzer Log (18:22)',
        category: 'log',
        description:
          'Secondary mass-spectrometer log on Argon Glovebox #1 records a 14.2 ppm oxygen ingress spike at 18:22:08 when the side transfer airlock was cycled using Dr. Keith Mercer’s PIN.',
        discoveryLocation: 'Argon Glovebox Telemetry',
        relevantTimestamp: '18:22',
        establishes: 'Proves Dr. Keith Mercer cycled the glovebox transfer port open at 18:22 during his solo shift.',
        relatedSuspectIds: ['dr_keith_mercer'],
        hotspotX: 46,
        hotspotY: 40,
      },
      {
        id: 'CLUE-802',
        title: 'Batch #Si-99 Laser Etch on Dummy Wafer',
        category: 'forensic',
        description:
          'Microscopic inspection of the fake wafer left on the levitation stage reveals serial edge code #Si-99-04. The remaining 24 wafers of Lot #Si-99 are found inside Dr. Keith Mercer’s personal bench drawer.',
        discoveryLocation: 'Levitation Stage & Bench 2',
        establishes: 'The dummy silicon wafer came directly from Dr. Mercer’s personal stock.',
        relatedSuspectIds: ['dr_keith_mercer', 'dr_mei_lin'],
        hotspotX: 30,
        hotspotY: 52,
      },
      {
        id: 'CLUE-803',
        title: 'Cryo-Glove Polymer Fibers on Dewar #3 Valve',
        category: 'forensic',
        description:
          'Blue nitrile residue and Dr. Mercer’s badge RFID ping at 18:26 on the Hazmat Pass-Through bay housing Liquid Nitrogen Dewar #3.',
        discoveryLocation: 'Hazmat Pass-Through Bay',
        relevantTimestamp: '18:26',
        establishes: 'Refutes Dr. Mercer’s claim that he never touched Dewar #3.',
        relatedSuspectIds: ['dr_keith_mercer', 'toby_vance'],
        hotspotX: 74,
        hotspotY: 48,
      },
      {
        id: 'CLUE-804',
        title: 'Ceramic Tweezer Scratches on Wafer Carrier',
        category: 'forensic',
        description: 'Zirconia ceramic particles matching Dr. Mercer’s non-magnetic tweezers found inside the glovebox port.',
        discoveryLocation: 'Glovebox Transfer Port',
        establishes: 'Confirms non-magnetic tweezers were used to swap the wafer.',
        relatedSuspectIds: ['dr_keith_mercer'],
        hotspotX: 55,
        hotspotY: 62,
      },
      {
        id: 'CLUE-805',
        title: 'Helios Superconductor Wafer Inside Dewar #3',
        category: 'physical',
        description:
          'Suspended on a titanium dip-rod submerged in liquid nitrogen at -196°C inside Dewar #3 is the authentic Project Helios Superconductor Wafer #01.',
        discoveryLocation: 'Liquid Nitrogen Dewar #3',
        establishes: 'Recovers the stolen $150M superconductor wafer inside the Dewar Dr. Mercer scheduled for external pickup.',
        relatedSuspectIds: ['dr_keith_mercer'],
        hotspotX: 82,
        hotspotY: 65,
      },
      {
        id: 'CLUE-806',
        title: 'Hyperion Dynamics $25M Defection Contract',
        category: 'document',
        description:
          'Encrypted PDF in Dr. Keith Mercer’s briefcase offering $25,000,000 upon delivery of a "verified superconducting apatite sample" by midnight.',
        discoveryLocation: 'Physicist Locker #4',
        establishes: 'Establishes Dr. Mercer’s $25M corporate espionage motive.',
        relatedSuspectIds: ['dr_keith_mercer'],
        hotspotX: 20,
        hotspotY: 28,
      },
      {
        id: 'CLUE-807',
        title: 'Conference Room Video Feed (Dr. Mei Lin)',
        category: 'log',
        description: 'Confirms Dr. Mei Lin was upstairs with Department of Energy officials from 17:45 to 18:40.',
        discoveryLocation: 'Executive Boardroom',
        establishes: 'Exonerates Dr. Mei Lin.',
        relatedSuspectIds: ['dr_mei_lin'],
        hotspotX: 62,
        hotspotY: 22,
      },
      {
        id: 'CLUE-808',
        title: 'Signed 19:00 Hazmat Courier Manifest',
        category: 'document',
        description: 'Work order signed by Dr. Keith Mercer authorizing external removal of Dewar #3 without X-ray screening.',
        discoveryLocation: 'Security Gatehouse',
        establishes: 'Proves how Mercer planned to smuggle Dewar #3 past the portal.',
        relatedSuspectIds: ['dr_keith_mercer', 'captain_reed'],
        hotspotX: 18,
        hotspotY: 72,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-801',
        statementId: 'STMT-KM1',
        clueId: 'CLUE-801',
        verdict: 'CONTRADICTION',
        title: '14.2 ppm Oxygen Ingress Spike Logged at 18:22',
        explanation:
          'Dr. Mercer claimed he never opened the glovebox port and oxygen stayed at 0.0 ppm, but CLUE-801 proves his PIN cycled the port at 18:22, causing a 14.2 ppm oxygen spike.',
      },
      {
        id: 'RULE-802',
        statementId: 'STMT-KM2',
        clueId: 'CLUE-803',
        verdict: 'CONTRADICTION',
        title: 'RFID Ping & Fibers on Dewar #3 at 18:26',
        explanation:
          'Mercer denied touching Dewar #3, which is refuted by his 18:26 RFID ping at the Hazmat bay (CLUE-803) and the wafer inside Dewar #3 (CLUE-805).',
      },
      {
        id: 'RULE-803',
        statementId: 'STMT-KM3',
        clueId: 'CLUE-806',
        verdict: 'CONTRADICTION',
        title: '$25M Hyperion Dynamics Espionage Contract',
        explanation:
          'Mercer denied contact with rival firms, whereas CLUE-806 reveals his signed $25M defection agreement with Hyperion Dynamics.',
      },
    ],
    timeline: [
      {
        id: 'T8-1',
        time: '18:15',
        displayTime: '06:15 PM',
        title: 'Dr. Mercer Enters Cleanroom 4 Alone',
        description: 'Mercer begins his solo calibration shift.',
        source: 'Airlock Badge Log',
        suspectId: 'dr_keith_mercer',
        status: 'CONFIRMED',
      },
      {
        id: 'T8-2',
        time: '18:22',
        displayTime: '06:22 PM',
        title: 'Argon Glovebox Cycled & Wafer Swapped',
        description: 'Mercer cycles the glovebox port (14.2 ppm O2 spike) and swaps the Helios wafer with a Lot #Si-99 dummy.',
        source: 'Trace Oxygen Analyzer',
        suspectId: 'dr_keith_mercer',
        clueId: 'CLUE-801',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Mercer’s claim that the glovebox was never opened.',
      },
      {
        id: 'T8-3',
        time: '18:26',
        displayTime: '06:26 PM',
        title: 'Wafer Submerged in Liquid Nitrogen Dewar #3',
        description: 'Mercer suspends the wafer inside Dewar #3 and loads it into the Hazmat Pass-Through for 19:00 courier pickup.',
        source: 'Hazmat RFID & Witness Toby Vance',
        suspectId: 'dr_keith_mercer',
        clueId: 'CLUE-805',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Mercer’s denial of touching Dewar #3.',
      },
    ],
    solution: {
      culpritId: 'dr_keith_mercer',
      culpritName: 'Dr. Keith Vance-Mercer (Senior Materials Physicist)',
      motiveSummary:
        'Bitter over being listed second on the Helios patent, Mercer signed a $25M corporate espionage deal with rival Hyperion Dynamics (CLUE-806).',
      opportunitySummary:
        'During his 18:15 shift, he cycled the Argon Glovebox transfer port at 18:22 (CLUE-801), replaced the Helios wafer with a silicon blank from his Batch #Si-99 (CLUE-802), and submerged the real wafer inside Liquid Nitrogen Dewar #3 (CLUE-803, CLUE-805) scheduled for external hazmat pickup (CLUE-808) to bypass the personnel airlock metal detector.',
      actualSequence: [
        '18:22 — Cycles the Argon Glovebox transfer port using his PIN, causing a 14.2 ppm oxygen spike.',
        '18:23 — Places a Batch #Si-99 silicon dummy on the levitation stage.',
        '18:26 — Submerges the real Helios wafer inside Liquid Nitrogen Dewar #3 and loads it into the Hazmat Pass-Through bay.',
        '18:45 — Dr. Mei Lin discovers the dummy before the 19:00 courier truck can remove Dewar #3.',
      ],
      keyTargetLocation: 'Submerged on a titanium dip-rod inside Liquid Nitrogen Dewar #3 in the Hazmat Pass-Through bay.',
      decisiveClueIds: ['CLUE-801', 'CLUE-802', 'CLUE-805', 'CLUE-806'],
      motiveKeywords: ['hyperion', '25m', 'patent', 'rival', 'espionage', 'bonus'],
      opportunityKeywords: ['argon', 'oxygen', '14.2', 'glovebox', 'dewar', 'nitrogen', 'si-99', 'dummy'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'dr_mei_lin',
          reason: 'Upstairs briefing the Department of Energy delegation (CLUE-807).',
        },
        {
          suspectId: 'toby_vance',
          reason: 'Stationed outside the airlock and witnessed Mercer moving Dewar #3.',
        },
        {
          suspectId: 'captain_reed',
          reason: 'Intercepted the courier truck at the gate.',
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 9: THE BILLIONAIRE'S LAST MESSAGE
  // ============================================================================
  {
    id: 'case-009',
    levelNumber: 9,
    code: 'CASE-009',
    title: 'The Billionaire’s Last Message',
    subtitle: 'Superyacht Obsidian · Mediterranean Anchor',
    difficulty: 'Expert',
    timeLimitSeconds: 360,
    location: 'Bridge & Owner’s Deck, M/Y Obsidian',
    date: 'December 12, 2026',
    timeframe: '23:00 – 00:15',
    premise:
      'Tech billionaire Victor Sterling discovered that one of his four executive officers had secretly siphoned $200M from his "Aether Orbital" pension fund. At 23:45, the yacht’s main telemetry blacked out, and Sterling vanished into his panic launch—leaving behind a locked Titanium Cold-Storage Ledger and a 4-part Nautical Signal Cipher on his bridge console: "LOOK TO THE BAROMETER — THE COMPASS LIES BY TEN DEGREES — CHECK THE BILGE MANIFOLD — C.V."',
    crimeSceneDescription:
      'A sleek teak-and-carbon-fiber superyacht bridge overlooking dark swells, with a brass marine aneroid barometer, a magnetic binnacle compass, and a chart table.',
    crimeSceneZoneNames: ['Brass Marine Barometer', 'Binnacle Compass Housing', 'Chart Table Terminal', 'Engine Bilge Manifold'],
    victimItem: {
      title: 'Aether Orbital $200M Recovery Cold-Ledger',
      artistOrOwner: 'Victor Sterling',
      yearOrCode: 'Ledger #AO-200',
      estimatedValue: '$200,000,000 USD',
      mediumOrType: 'Titanium cryptographic hardware key and signed confession dossier',
      description: 'Stolen from Sterling’s chart desk after the perpetrator disabled the satellite uplink.',
    },
    hints: [
      'Decode Sterling’s message ("THE COMPASS LIES BY TEN DEGREES"): inspect the Binnacle Compass Housing (CLUE-901)—a magnetic neodymium drive hidden inside deflected the compass needle by 10 degrees!',
      'Check who had access to the Engine Bilge Manifold at 23:35: compare CFO Conrad Vance’s alibi with the Bilge Valve Biometric Log (CLUE-902).',
      'Compare the initials "C.V." and the Cayman shell transfers (CLUE-905) with Conrad Vance’s statement.',
    ],
    motiveOptions: [
      {
        id: 'm9_1',
        text: 'To destroy the Titanium Cold-Ledger before Sterling transmitted proof of CFO Conrad Vance’s $200M embezzlement to Maritime Interpol at midnight.',
        isCorrect: true,
      },
      {
        id: 'm9_2',
        text: 'A mutiny by the yacht’s chef over Mediterranean docking ports.',
        isCorrect: false,
      },
      {
        id: 'm9_3',
        text: 'To claim salvage rights on the yacht’s helicopter.',
        isCorrect: false,
      },
      {
        id: 'm9_4',
        text: 'To hide a minor scratch on the starboard hull.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o9_1',
        text: 'Cut the satellite coax cable in the Bilge Manifold at 23:35, took the Titanium Cold-Ledger from the chart room at 23:40, and hid the magnetic drive inside the brass binnacle compass housing (causing a 10-degree magnetic deviation).',
        isCorrect: true,
      },
      {
        id: 'o9_2',
        text: 'Swam under the yacht hull in scuba gear during a thunderstorm.',
        isCorrect: false,
      },
      {
        id: 'o9_3',
        text: 'Fired the ledger out of a flare gun toward a passing fishing boat.',
        isCorrect: false,
      },
      {
        id: 'o9_4',
        text: 'Hacked the autopilot from a hotel in Monaco.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'conrad_vance',
        name: 'Conrad Vance',
        role: 'Chief Financial Officer (Initials: C.V.)',
        age: 47,
        portraitTheme: 'curator',
        personality: 'Smooth, calculating, and dismissive.',
        relationshipToCase: 'Co-signatory on the Aether Orbital pension fund; initials match "C.V." in Sterling’s cipher.',
        possibleMotive: 'Secretly wired $200M from the pension fund into Case Zero syndicate shell accounts.',
        initialAlibi: 'Claims he was in the aft Cigar Lounge from 23:15 to 00:00 and never visited the Engine Bilge or the Bridge.',
        relevantKnowledge: [
          'Cut the satellite uplink coax in the Bilge Manifold at 23:35 so Sterling couldn’t upload the audit.',
          'Hid the magnetic titanium ledger inside the hollow brass binnacle compass stand on the bridge.',
        ],
        publicStatement:
          'I was in the aft Cigar Lounge nursing a scotch from 23:15 to midnight! I never went near the Engine Bilge or the Bridge, and "C.V." stands for "Cargo Vessel", not Conrad Vance!',
        privateInformation:
          'Putting the magnetic titanium ledger inside the binnacle housing deflected the ship’s magnetic compass by +10.4 degrees at 23:41.',
        statements: [
          {
            id: 'STMT-CV1',
            suspectId: 'conrad_vance',
            topic: 'Aft Cigar Lounge Alibi (23:15–00:00)',
            quote: 'I remained in the aft Cigar Lounge from 23:15 to 00:00 and never descended to the Engine Bilge Manifold.',
            timestampClaim: '23:15 – 00:00',
            locationClaim: 'Aft Cigar Lounge',
          },
          {
            id: 'STMT-CV2',
            suspectId: 'conrad_vance',
            topic: 'Bridge & Binnacle Compass Access',
            quote: 'I never set foot on the Bridge tonight or touched the magnetic binnacle compass.',
            locationClaim: 'Yacht Bridge',
          },
          {
            id: 'STMT-CV3',
            suspectId: 'conrad_vance',
            topic: 'Meaning of "C.V." & Pension Audit',
            quote: 'The Aether Orbital pension fund is 100% solvent, and "C.V." in Victor’s message has nothing to do with my name.',
          },
        ],
        interrogationQA: [
          {
            question: 'Why did the Engine Bilge watertight door log your keycard at 23:34?',
            answer: 'I... I dropped my cigar cutter down the companionway stairs and stepped down for thirty seconds!',
            keywords: ['bilge', '23:34', 'door', 'cable', 'satellite'],
          },
          {
            question: 'Why did the bridge magnetic compass suddenly deviate by 10 degrees at 23:41?',
            answer: 'Magnetic anomalies in the seabed! How should a CFO know anything about ship compasses?',
            keywords: ['compass', 'ten', '10', 'degrees', 'binnacle', 'magnetic'],
          },
          {
            question: 'What does "C.V." at the end of Sterling’s last message mean?',
            answer: 'Cape Verde? Cargo Vessel? It certainly doesn’t stand for Conrad Vance!',
            keywords: ['c.v.', 'cv', 'initials', 'message', '200m'],
          },
        ],
      },
      {
        id: 'captain_maddox',
        name: 'Capt. Liam Maddox',
        role: 'Yacht Master',
        age: 53,
        portraitTheme: 'security',
        personality: 'Disciplined mariner.',
        relationshipToCase: 'Noticed the 10-degree magnetic compass error on the bridge telemetry.',
        possibleMotive: 'None.',
        initialAlibi: 'Inspecting the bow anchor winch with the Bosun from 23:20 to 23:50.',
        relevantKnowledge: [
          'Explains that the yacht’s magnetic binnacle only deviates by 10 degrees if someone places a ferromagnetic neodymium object inside its brass correction drawer.',
        ],
        publicStatement:
          'At 23:41, our bridge log recorded an abrupt +10.4° deviation on the magnetic binnacle compass! That only happens if someone hides a magnetized metal drive inside the binnacle stand.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-LM1',
            suspectId: 'captain_maddox',
            topic: '23:41 Compass Deviation Spike',
            quote: 'At 23:41, the binnacle compass deviated by 10.4 degrees because a magnetic drive was stuffed inside the brass housing.',
            timestampClaim: '23:41',
          },
        ],
        interrogationQA: [
          {
            question: 'What did Sterling mean by "THE COMPASS LIES BY TEN DEGREES"?',
            answer: 'At 23:41 the magnetic binnacle jumped 10.4 degrees off gyro heading! Whoever hid the magnetized Titanium Ledger stuffed it inside the brass compass housing!',
            keywords: ['compass', 'ten', '10', 'degrees', 'binnacle', 'ledger'],
          },
        ],
      },
      {
        id: 'elena_rostova',
        name: 'Elena Rostova',
        role: 'Chief Legal Counsel',
        age: 38,
        portraitTheme: 'restorer',
        personality: 'Sharp and analytical.',
        relationshipToCase: 'Helped Sterling draft the Interpol criminal complaint against Conrad Vance.',
        possibleMotive: 'None.',
        initialAlibi: 'In her stateroom reviewing the complaint.',
        relevantKnowledge: [
          'Confirms Sterling hid the paper backup of the $200M audit behind the Brass Barometer face ("LOOK TO THE BAROMETER").',
        ],
        publicStatement:
          'Victor told me at 22:30 that if anything happened to the satellite link, he hid the signed wire transfer receipts behind the Brass Barometer dial on the bridge—and they name Conrad Vance!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-ER1',
            suspectId: 'elena_rostova',
            topic: 'Secret Compartment Behind Barometer',
            quote: 'Victor hid the signed embezzlement wire receipts behind the Brass Barometer dial, naming CFO Conrad Vance ("C.V.").',
          },
        ],
        interrogationQA: [
          {
            question: 'What does "LOOK TO THE BAROMETER" mean?',
            answer: 'Unscrew the brass barometer bezel on the bridge! Victor tucked the paper wire receipts proving Conrad Vance stole $200M right behind the dial.',
            keywords: ['barometer', 'look', 'message', 'receipts', 'conrad'],
          },
        ],
      },
      {
        id: 'julian_thorne',
        name: 'Julian Thorne',
        role: 'Chief Communications Officer',
        age: 32,
        portraitTheme: 'heir',
        personality: 'Anxious tech specialist.',
        relationshipToCase: 'Discovered the severed satellite coax cable.',
        possibleMotive: 'None.',
        initialAlibi: 'In the radio shack.',
        relevantKnowledge: [
          'Traced the satellite cut to the Engine Bilge Manifold at 23:35.',
        ],
        publicStatement: 'The satellite coax was sliced with insulated shears inside the Engine Bilge Manifold at 23:35:12!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-JT1',
            suspectId: 'julian_thorne',
            topic: '23:35 Bilge Coax Severance',
            quote: 'The satellite uplink cable was severed at 23:35 inside the Engine Bilge Manifold.',
            timestampClaim: '23:35',
          },
        ],
        interrogationQA: [
          {
            question: 'Why did Sterling say "CHECK THE BILGE MANIFOLD"?',
            answer: 'Because that’s where the satellite uplink cable runs! It was cut at 23:35, and the watertight door logs who entered.',
            keywords: ['bilge', 'manifold', 'satellite', 'cable', '23:35'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-901',
        title: 'Titanium Cold-Ledger Inside Binnacle Compass',
        category: 'physical',
        description:
          'Opening the brass Flinders-bar correction drawer beneath the Bridge magnetic compass reveals the stolen Titanium Cold-Ledger #AO-200. Its magnetic casing caused the exact +10.4° compass deviation logged at 23:41.',
        discoveryLocation: 'Bridge Binnacle Compass Stand',
        relevantTimestamp: '23:41',
        establishes: 'Decodes "THE COMPASS LIES BY TEN DEGREES" and recovers the stolen Titanium Ledger.',
        relatedSuspectIds: ['conrad_vance', 'captain_maddox'],
        hotspotX: 52,
        hotspotY: 44,
      },
      {
        id: 'CLUE-902',
        title: 'Engine Bilge Watertight Door Log (23:34)',
        category: 'log',
        description:
          'Electronic bulkhead log records CFO Conrad Vance’s keycard unlocking the Engine Bilge Manifold at 23:34:18 and exiting at 23:36:05—spanning the exact 23:35:12 timestamp when the satellite uplink cable was severed.',
        discoveryLocation: 'Engine Bilge Bulkhead',
        relevantTimestamp: '23:34 – 23:36',
        establishes: 'Decodes "CHECK THE BILGE MANIFOLD" and destroys Conrad Vance’s Cigar Lounge alibi.',
        relatedSuspectIds: ['conrad_vance', 'julian_thorne'],
        hotspotX: 25,
        hotspotY: 70,
      },
      {
        id: 'CLUE-903',
        title: 'Havana Cigar Ash Inside Bridge Compass Drawer',
        category: 'forensic',
        description:
          'Trace ash from a rare Cohiba Behike cigar—the exact ring-gauge smoked exclusively by Conrad Vance tonight—found inside the brass compass housing alongside his latent thumbprint.',
        discoveryLocation: 'Bridge Binnacle Drawer',
        relevantTimestamp: '23:41',
        establishes: 'Places Conrad Vance physically at the Bridge binnacle compass at 23:41.',
        relatedSuspectIds: ['conrad_vance'],
        hotspotX: 60,
        hotspotY: 38,
      },
      {
        id: 'CLUE-904',
        title: 'Severed Coax Cable & Insulated Wire Cutters',
        category: 'physical',
        description:
          'Copper coax shavings found on a pair of insulated wire cutters tucked behind the bilge pipe, bearing threads from Conrad Vance’s monogrammed silk pocket square.',
        discoveryLocation: 'Engine Bilge Manifold',
        relevantTimestamp: '23:35',
        establishes: 'Proves Conrad Vance cut the satellite uplink cable at 23:35.',
        relatedSuspectIds: ['conrad_vance'],
        hotspotX: 35,
        hotspotY: 75,
      },
      {
        id: 'CLUE-905',
        title: '$200M Embezzlement Receipts Behind Brass Barometer',
        category: 'document',
        description:
          'Concealed behind the unscrewed face of the Bridge Brass Barometer is Victor Sterling’s signed dossier proving CFO Conrad Vance ("C.V.") wired $200M into offshore account "Vesper-Zero".',
        discoveryLocation: 'Bridge Brass Barometer',
        establishes: 'Decodes "LOOK TO THE BAROMETER — C.V." and proves Conrad Vance’s $200M motive.',
        relatedSuspectIds: ['conrad_vance', 'elena_rostova'],
        hotspotX: 78,
        hotspotY: 32,
      },
      {
        id: 'CLUE-906',
        title: 'Bow Anchor Winch CCTV (Capt. Maddox)',
        category: 'log',
        description: 'Deck camera confirms Capt. Maddox was on the foredeck from 23:20 to 23:50.',
        discoveryLocation: 'Foredeck Camera',
        establishes: 'Exonerates Capt. Maddox.',
        relatedSuspectIds: ['captain_maddox'],
        hotspotX: 16,
        hotspotY: 28,
      },
      {
        id: 'CLUE-907',
        title: 'Sterling’s Encrypted Escape Launch Ping',
        category: 'log',
        description:
          'Automated beacon from Victor Sterling’s lifeboat at 00:05 confirming he staged his escape to safety after planting the 4-part cipher to trap Conrad Vance.',
        discoveryLocation: 'Bridge Chart Table',
        establishes: 'Confirms Victor Sterling is alive and left the cipher specifically to expose Conrad Vance.',
        relatedSuspectIds: ['conrad_vance', 'elena_rostova'],
        hotspotX: 44,
        hotspotY: 58,
      },
      {
        id: 'CLUE-908',
        title: 'Cigar Lounge Steward Log',
        category: 'log',
        description: 'Steward notes the Cigar Lounge was empty between 23:30 and 23:45.',
        discoveryLocation: 'Aft Deck Lounge',
        relevantTimestamp: '23:30 – 23:45',
        establishes: 'Further refutes Conrad Vance’s alibi.',
        relatedSuspectIds: ['conrad_vance'],
        hotspotX: 85,
        hotspotY: 62,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-901',
        statementId: 'STMT-CV1',
        clueId: 'CLUE-902',
        verdict: 'CONTRADICTION',
        title: 'Keycard Logged Entering Engine Bilge at 23:34',
        explanation:
          'Conrad Vance claimed he stayed in the Cigar Lounge and never visited the Bilge, but CLUE-902 proves his keycard unlocked the Engine Bilge Manifold from 23:34 to 23:36 when the satellite cable was cut.',
      },
      {
        id: 'RULE-902',
        statementId: 'STMT-CV2',
        clueId: 'CLUE-903',
        verdict: 'CONTRADICTION',
        title: 'Thumbprint & Cohiba Ash Inside Bridge Compass Drawer',
        explanation:
          'Vance denied setting foot on the Bridge or touching the compass, which is refuted by his thumbprint and Cohiba cigar ash inside the binnacle drawer (CLUE-903) and the 23:41 compass deviation (CLUE-901).',
      },
      {
        id: 'RULE-903',
        statementId: 'STMT-CV3',
        clueId: 'CLUE-905',
        verdict: 'CONTRADICTION',
        title: 'Barometer Dossier Proves $200M Embezzlement by "C.V." (Conrad Vance)',
        explanation:
          'Vance claimed the fund was solvent and "C.V." didn’t mean him, whereas the Barometer dossier (CLUE-905) contains his signed $200M wire transfers.',
      },
    ],
    timeline: [
      {
        id: 'T9-1',
        time: '23:34',
        displayTime: '11:34 PM',
        title: 'Conrad Vance Enters Engine Bilge & Cuts Satellite Coax',
        description: 'Vance uses his keycard to enter the Bilge Manifold and severs the satellite uplink cable at 23:35.',
        source: 'Bulkhead Log & Severed Coax',
        suspectId: 'conrad_vance',
        clueId: 'CLUE-902',
        status: 'CONTRADICTED',
        conflictNote: 'Destroys Vance’s Cigar Lounge alibi.',
      },
      {
        id: 'T9-2',
        time: '23:41',
        displayTime: '11:41 PM',
        title: 'Titanium Ledger Hidden in Bridge Compass Stand (+10.4° Error)',
        description: 'Vance steals the Titanium Cold-Ledger from the chart room and hides it inside the brass binnacle compass stand, deflecting the needle by 10.4 degrees.',
        source: 'Compass Telemetry & Cigar Ash',
        suspectId: 'conrad_vance',
        clueId: 'CLUE-901',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Vance’s denial of visiting the Bridge.',
      },
      {
        id: 'T9-3',
        time: '23:45',
        displayTime: '11:45 PM',
        title: 'Sterling Leaves 4-Part Cipher & Deploys Escape Launch',
        description: 'Realizing the satellite is cut and the compass is deflected, Sterling types the 4-part cipher pointing to the Barometer, Compass, Bilge, and C.V.',
        source: 'Bridge Console & Launch Beacon',
        clueId: 'CLUE-905',
        status: 'CONFIRMED',
      },
    ],
    solution: {
      culpritId: 'conrad_vance',
      culpritName: 'Conrad Vance (Chief Financial Officer)',
      motiveSummary:
        'Conrad Vance ("C.V.") embezzled $200M from the Aether Orbital pension fund (CLUE-905) and had to stop Victor Sterling from transmitting the Titanium Cold-Ledger to Interpol at midnight.',
      opportunitySummary:
        'At 23:34, Vance entered the Engine Bilge Manifold (CLUE-902) and severed the satellite coax cable (CLUE-904). At 23:41, he stole the Titanium Cold-Ledger from the Bridge and hid it inside the brass binnacle compass housing (CLUE-901, CLUE-903), causing the exact 10-degree compass error that Sterling immortalized in his 4-part cipher.',
      actualSequence: [
        '23:34 — Conrad Vance unlocks the Engine Bilge Manifold and cuts the satellite coax cable at 23:35.',
        '23:40 — He enters the Bridge, steals the Titanium Cold-Ledger, and hides it inside the brass binnacle compass stand at 23:41 (causing a +10.4° magnetic deviation).',
        '23:45 — Victor Sterling notices the 10° compass deviation, hides the paper wire receipts behind the Brass Barometer, types the 4-part cipher ("C.V."), and escapes via panic launch.',
      ],
      keyTargetLocation: 'Flinders-bar correction drawer inside the Bridge Binnacle Compass stand.',
      decisiveClueIds: ['CLUE-901', 'CLUE-902', 'CLUE-903', 'CLUE-905'],
      motiveKeywords: ['200m', 'pension', 'aether', 'embezzle', 'interpol', 'c.v.'],
      opportunityKeywords: ['compass', 'binnacle', '10', 'ten', 'bilge', 'satellite', 'coax', 'barometer', 'cigar'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'captain_maddox',
          reason: 'On the foredeck on camera (CLUE-906) and identified the 10.4° binnacle deviation.',
        },
        {
          suspectId: 'elena_rostova',
          reason: 'Assisted Sterling with the Interpol filing and revealed the Barometer hiding spot.',
        },
        {
          suspectId: 'julian_thorne',
          reason: 'Pinpointed the 23:35 bilge cable cut.',
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 10: CASE ZERO — THE SYNDICATE ARCHITECT
  // ============================================================================
  {
    id: 'case-010',
    levelNumber: 10,
    code: 'CASE-010',
    title: 'CASE ZERO: The Syndicate Architect',
    subtitle: 'Central Detective Bureau · Vault Zero',
    difficulty: 'Mastermind',
    timeLimitSeconds: 420, // 7 minutes for Grand Finale
    location: 'Sub-Level 5 Master Evidence Vault, Central Bureau HQ',
    date: 'December 20, 2026',
    timeframe: '02:00 – 03:00 AM',
    premise:
      'Every case you have solved—the Museum Forgery (Case 1), the Cayman Vault (Case 3), the Apex Customs Ring (Case 4), the Geneva Bond Swap (Case 6), the Helios Wafer (Case 8), and the $200M Vesper-Zero Wire (Case 9)—was orchestrated by a single shadowy broker known as "ARCHITECT ZERO". Tonight at 02:30 AM, someone breached Sub-Level 5 of Bureau HQ to erase the Master Syndicate Dossier ("FILE ZERO"). Four senior Bureau officials are locked inside the sector.',
    crimeSceneDescription:
      'The circular concrete heart of Bureau Intelligence: an air-gapped Faraday server core, a Faraday pneumatic canister lock, an encrypted Morse teletype terminal, and the Chief Deputy’s glass command booth.',
    crimeSceneZoneNames: ['Faraday Core Terminal', 'Pneumatic Seal Lock', 'Command Booth Desk', 'Biometric Faraday Gate'],
    victimItem: {
      title: 'Master Dossier "FILE ZERO" (Optical Drive)',
      artistOrOwner: 'Special Task Force Zero',
      yearOrCode: 'Dossier #FZ-000',
      estimatedValue: 'Priceless (Complete Syndicate Network Map)',
      mediumOrType: 'Gold-sputtered archival magneto-optical WORM disk',
      description: 'Links the bank accounts of "Architect Zero" across all nine previous investigations.',
    },
    hints: [
      'Trace the common denominator across Cases 1, 3, 4, 8, and 9: check the Syndicate Authorization Cipher (CLUE-1001)—every case transfer was countersigned using Bureau Override Key #BD-01!',
      'Compare Deputy Director Vance-Sterling’s claim that he was in the 4th-Floor Situation Room at 02:20 with the Faraday Core Atmospheric Mass-Log (CLUE-1002) and his pacemaker EMI shield log (CLUE-1004).',
      'Look inside the hollow base of the Bureau Distinguished Service Bust in the Command Booth (CLUE-1006)—an echo of Case 001!',
    ],
    motiveOptions: [
      {
        id: 'm10_1',
        text: 'Deputy Director Vance-Sterling IS "Architect Zero"—he used confidential Bureau case files to blackmail suspects across all nine previous heists and needed to erase File Zero before its 03:00 AM automatic decryption.',
        isCorrect: true,
      },
      {
        id: 'm10_2',
        text: 'To test the Bureau’s disaster recovery backup protocols.',
        isCorrect: false,
      },
      {
        id: 'm10_3',
        text: 'A rivalry with the municipal police commissioner over parking spaces.',
        isCorrect: false,
      },
      {
        id: 'm10_4',
        text: 'To delete overdue library fines on forensic manuals.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o10_1',
        text: 'Used his #BD-01 Executive Override Key at 02:22 to enter the Faraday Core while looping his Situation Room webcam feed, ejected the File Zero optical disk before the 03:00 decryption finished, and hid it inside the hollow bronze Distinguished Service Bust in his command booth.',
        isCorrect: true,
      },
      {
        id: 'o10_2',
        text: 'Tunnelled through the bedrock from the city subway station.',
        isCorrect: false,
      },
      {
        id: 'o10_3',
        text: 'Used a carrier pigeon through the sub-basement ventilation shaft.',
        isCorrect: false,
      },
      {
        id: 'o10_4',
        text: 'Magnetized the entire building from a helicopter.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'director_vance_sterling',
        name: 'Deputy Director Julian Vance-Sterling',
        role: 'Bureau Chief of Special Investigations (Badge #BD-01)',
        age: 59,
        portraitTheme: 'curator',
        personality: 'Commanding, patrician, brilliant, and chillingly composed.',
        relationshipToCase: 'Assigned you to all nine previous cases; holds Executive Badge #BD-01.',
        possibleMotive: 'He is "Architect Zero"—he engineered the syndicate network and assigned you to clean up loose ends when operatives failed.',
        initialAlibi: 'Claims he was on a live video conference in the 4th-Floor Situation Room from 02:00 to 02:45 AM.',
        relevantKnowledge: [
          'Every syndicate escrow account from Cases 1–9 used a cryptographic salt derived from Badge #BD-01.',
          'Wears a titanium-shielded cardiac monitor that logs electromagnetic field drops whenever he enters the Sub-Level 5 Faraday Cage.',
        ],
        publicStatement:
          'I personally recruited you to Case Zero, Detective! From 02:00 to 02:45 I was visible on the 4th-Floor Situation Room video feed, and I never set foot inside the Sub-Level 5 Faraday Cage tonight.',
        privateInformation:
          'He looped a 15-minute pre-recorded video on the Situation Room conference call while taking the private executive lift down to Sub-Level 5 at 02:18.',
        statements: [
          {
            id: 'STMT-VS1',
            suspectId: 'director_vance_sterling',
            topic: '4th-Floor Video Conference Alibi (02:00–02:45)',
            quote: 'I was in the 4th-Floor Situation Room on a live video call from 02:00 to 02:45 and never entered the Sub-Level 5 Faraday Cage.',
            timestampClaim: '02:00 – 02:45',
            locationClaim: '4th-Floor Situation Room',
          },
          {
            id: 'STMT-VS2',
            suspectId: 'director_vance_sterling',
            topic: 'Badge #BD-01 Cryptographic Key',
            quote: 'My executive badge #BD-01 was never used to authorize any syndicate escrow or access the File Zero terminal.',
          },
          {
            id: 'STMT-VS3',
            suspectId: 'director_vance_sterling',
            topic: 'No Connection to Previous Culprits',
            quote: 'I had zero prior contact with Arthur Pendelton, Helena Vance, Cole Mercer, or Conrad Vance before their arrests.',
          },
        ],
        interrogationQA: [
          {
            question: 'Why did your cardiac monitor log a total RF-zero Faraday blackout from 02:20 to 02:28?',
            answer: 'Sub-Level 5 is the only zero-RF Faraday cage in the city... You checked my medical telemetry?!',
            keywords: ['faraday', 'cardiac', 'pacemaker', '02:20', 'rf', 'cage'],
          },
          {
            question: 'How were you on the 4th-floor video call if the reflection in your glasses showed the 01:45 wall clock?',
            answer: 'A compression artifact on the webcam stream! You dare accuse your own commanding officer of looping a video feed?',
            keywords: ['video', 'webcam', 'loop', 'clock', 'glasses', '01:45'],
          },
          {
            question: 'Why did you assign me to solve Cases 1 through 9 if you are Architect Zero?',
            answer: 'Because Pendelton, Mercer, and Conrad grew greedy and sloppy! I used the Bureau’s finest detective to prune my own compromised operatives—until you got too close to File Zero.',
            keywords: ['architect', 'zero', 'why', 'syndicate', 'assign', 'cases'],
          },
        ],
      },
      {
        id: 'helen_park',
        name: 'Chief Analyst Helen Park',
        role: 'Head of Cryptographic Forensics',
        age: 35,
        portraitTheme: 'restorer',
        personality: 'Brilliantly analytical and loyal to the truth.',
        relationshipToCase: 'Programmed the 03:00 AM decryption of File Zero that forced Architect Zero’s hand.',
        possibleMotive: 'None—she built the trap to catch the mole.',
        initialAlibi: 'Locked inside the Glass Observation Gallery watching the decryption progress bar.',
        relevantKnowledge: [
          'Discovered that the 4th-Floor webcam stream of Deputy Director Vance-Sterling had a frozen clock reflection reading 01:45.',
        ],
        publicStatement:
          'Look at the Situation Room recording of Deputy Director Vance-Sterling at 02:25—the reflection in his spectacles shows the wall clock frozen at 01:45! He played a pre-recorded loop!',
        privateInformation: 'Planted a UV tracer on the File Zero optical disk case.',
        statements: [
          {
            id: 'STMT-HP1',
            suspectId: 'helen_park',
            topic: 'Frozen 01:45 Reflection in Webcam Feed',
            quote: 'The Situation Room video of Deputy Director Vance-Sterling at 02:25 was a pre-recorded loop made at 01:45.',
            timestampClaim: '02:25',
          },
        ],
        interrogationQA: [
          {
            question: 'How did you prove the Situation Room video alibi was faked?',
            answer: 'Zoom in on Vance-Sterling’s spectacles in the 02:25 frame—the reflection of the digital wall clock behind his monitor reads 01:45!',
            keywords: ['video', 'alibi', 'loop', 'reflection', '01:45'],
          },
        ],
      },
      {
        id: 'marcus_hale',
        name: 'Commander Marcus Hale',
        role: 'Internal Security Marshal',
        age: 51,
        portraitTheme: 'security',
        personality: 'Incorruptible and stoic.',
        relationshipToCase: 'Sealed the Sub-Level 5 blast doors at 02:31 AM.',
        possibleMotive: 'None.',
        initialAlibi: 'At the Sub-Level 5 blast door checkpoint.',
        relevantKnowledge: [
          'Confirms nobody left Sub-Level 5 after 02:30—meaning the File Zero disk is still hidden inside the command sector.',
        ],
        publicStatement:
          'I sealed the blast doors at 02:31. File Zero hasn’t left this sub-level—search the Command Booth!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-MH1',
            suspectId: 'marcus_hale',
            topic: '02:31 Blast Door Lockdown',
            quote: 'The Sub-Level 5 blast doors sealed at 02:31; the stolen optical disk is still inside this sector.',
            timestampClaim: '02:31',
          },
        ],
        interrogationQA: [
          {
            question: 'Could the File Zero disk have been removed from Sub-Level 5?',
            answer: 'Impossible. The blast doors locked at 02:31 before anyone exited. It is hidden inside this sector right now.',
            keywords: ['disk', 'hidden', 'blast', 'leave', 'sector'],
          },
        ],
      },
      {
        id: 'simon_kane',
        name: 'Simon Kane',
        role: 'Night Archivist',
        age: 29,
        portraitTheme: 'heir',
        personality: 'Bookish and perceptive.',
        relationshipToCase: 'Compiled the cross-case evidence index.',
        possibleMotive: 'None.',
        initialAlibi: 'Sorting physical dossiers in Vault Annex B.',
        relevantKnowledge: [
          'Found private encrypted burner calls from Deputy Director Vance-Sterling to Arthur Pendelton (Case 1) and Conrad Vance (Case 9) the night before each heist.',
        ],
        publicStatement:
          'I cross-referenced all nine cases! Every single culprit received an encrypted burner call from Badge #BD-01—Deputy Director Vance-Sterling—twenty-four hours before their crime!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-SK1',
            suspectId: 'simon_kane',
            topic: 'Cross-Case Burner Calls from #BD-01',
            quote: 'Every culprit from Cases 1 through 9 was contacted by Deputy Director Vance-Sterling’s encrypted relay before their crime.',
          },
        ],
        interrogationQA: [
          {
            question: 'How do all nine previous cases connect to Architect Zero?',
            answer: 'Pendelton’s forgery, Helena’s Cayman margin, Mercer’s customs ring, Keith’s Hyperion deal, and Conrad’s $200M wire all cleared through a single master broker: Badge #BD-01!',
            keywords: ['connect', 'cases', 'bd-01', 'broker', 'architect'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-1001',
        title: 'Cross-Case Cryptographic Salt (#BD-01 Master Key)',
        category: 'document',
        description:
          'Decrypted header from the Vesper-Zero bank ledger (Case 9), the Hyperion escrow (Case 8), the Geneva bond fund (Case 6), and the Authenticity tip-off (Case 1): all nine operations were countersigned by Hardware Token #BD-01, issued exclusively to Deputy Director Julian Vance-Sterling.',
        discoveryLocation: 'Cryptographic Forensics Lab',
        establishes: 'Proves Deputy Director Vance-Sterling is "Architect Zero", the mastermind connecting all 10 cases.',
        relatedSuspectIds: ['director_vance_sterling', 'simon_kane'],
        hotspotX: 28,
        hotspotY: 32,
      },
      {
        id: 'CLUE-1002',
        title: 'Looped Webcam Metadata & 01:45 Spectacle Reflection',
        category: 'forensic',
        description:
          'Frame-by-frame analysis of the 4th-Floor Situation Room video stream between 02:15 and 02:30 reveals a repeating 180-second loop recorded at 01:45 (visible in the reflection of Vance-Sterling’s glasses).',
        discoveryLocation: 'Situation Room Video Server',
        relevantTimestamp: '02:15 – 02:30',
        establishes: 'Shatters Vance-Sterling’s 4th-floor video conference alibi.',
        relatedSuspectIds: ['director_vance_sterling', 'helen_park'],
        hotspotX: 64,
        hotspotY: 26,
      },
      {
        id: 'CLUE-1003',
        title: 'Faraday Core KeySlot Override Log (02:22 AM)',
        category: 'log',
        description:
          'Hardware audit of the air-gapped Faraday Server Core logs physical Master Key #BD-01 interrupting the File Zero decryption at 02:22:14 and ejecting the magneto-optical disk.',
        discoveryLocation: 'Faraday Core Drive Bay',
        relevantTimestamp: '02:22',
        establishes: 'Proves Badge #BD-01 physically ejected File Zero at 02:22 AM.',
        relatedSuspectIds: ['director_vance_sterling'],
        hotspotX: 48,
        hotspotY: 48,
      },
      {
        id: 'CLUE-1004',
        title: 'Cardiac Telemetry RF-Zero Blackout Log',
        category: 'log',
        description:
          'Diagnostic log from Deputy Director Vance-Sterling’s smart cardiac monitor records total 0.0 dBm electromagnetic shielding from 02:20 to 02:28—a physical state that exists ONLY inside the Sub-Level 5 Faraday Cage.',
        discoveryLocation: 'Bureau Medical Telemetry Relay',
        relevantTimestamp: '02:20 – 02:28',
        establishes: 'Scientifically proves Vance-Sterling was physically inside the Sub-Level 5 Faraday Cage from 02:20 to 02:28.',
        relatedSuspectIds: ['director_vance_sterling'],
        hotspotX: 20,
        hotspotY: 62,
      },
      {
        id: 'CLUE-1005',
        title: 'UV Tracer Powder on Executive Cufflinks',
        category: 'forensic',
        description:
          'Invisible ultraviolet security powder applied by Analyst Helen Park to the File Zero disk case glows brightly on Deputy Director Vance-Sterling’s fingers and gold cufflinks.',
        discoveryLocation: 'Command Booth Inspection',
        relevantTimestamp: '02:32',
        establishes: 'Confirms Vance-Sterling handled the File Zero optical disk case with his own hands.',
        relatedSuspectIds: ['director_vance_sterling', 'helen_park'],
        hotspotX: 75,
        hotspotY: 54,
      },
      {
        id: 'CLUE-1006',
        title: 'File Zero Disk Inside Hollow Bronze Service Bust',
        category: 'physical',
        description:
          'In a chilling echo of Case 001, unscrewing the false marble plinth of the Bronze Distinguished Service Bust on Deputy Director Vance-Sterling’s Command Booth desk reveals the stolen "FILE ZERO" magneto-optical disk.',
        discoveryLocation: 'Deputy Director’s Command Booth',
        establishes: 'Recovers the intact File Zero optical disk inside Vance-Sterling’s private booth.',
        relatedSuspectIds: ['director_vance_sterling'],
        hotspotX: 84,
        hotspotY: 40,
      },
      {
        id: 'CLUE-1007',
        title: 'Burner Phone Relay Ledger (Cases 001–009)',
        category: 'document',
        description:
          'Encrypted micro-SIM found in Vance-Sterling’s fountain pen containing direct messages to Arthur Pendelton (Case 1), Dr. Julian Sterling (Case 2), Helena Vance (Case 3), Cole Mercer (Case 4), and Conrad Vance (Case 9).',
        discoveryLocation: 'Deputy Director’s Fountain Pen',
        establishes: 'Refutes his claim of having no prior contact with the previous culprits.',
        relatedSuspectIds: ['director_vance_sterling'],
        hotspotX: 55,
        hotspotY: 72,
      },
      {
        id: 'CLUE-1008',
        title: 'Observation Gallery Seal Log (Helen Park)',
        category: 'log',
        description: 'Confirms Analyst Helen Park was sealed in the outer observation gallery throughout the incident.',
        discoveryLocation: 'Observation Gallery',
        establishes: 'Exonerates Helen Park.',
        relatedSuspectIds: ['helen_park'],
        hotspotX: 35,
        hotspotY: 78,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-1001',
        statementId: 'STMT-VS1',
        clueId: 'CLUE-1004',
        verdict: 'CONTRADICTION',
        title: 'Cardiac Monitor Proves Presence in Faraday Cage (02:20–02:28)',
        explanation:
          'Vance-Sterling claimed he stayed on the 4th floor and never entered the Faraday Cage, but CLUE-1004 proves his cardiac monitor logged the zero-RF environment of the Sub-Level 5 Faraday Cage from 02:20 to 02:28.',
      },
      {
        id: 'RULE-1002',
        statementId: 'STMT-VS1',
        clueId: 'CLUE-1002',
        verdict: 'CONTRADICTION',
        title: 'Situation Room Webcam Was a Pre-Recorded 01:45 Loop',
        explanation:
          'CLUE-1002 proves the 4th-floor video conference stream was a looped recording showing 01:45 in the reflection of his spectacles.',
      },
      {
        id: 'RULE-1003',
        statementId: 'STMT-VS2',
        clueId: 'CLUE-1003',
        verdict: 'CONTRADICTION',
        title: 'Master Key #BD-01 Ejected File Zero at 02:22 AM',
        explanation:
          'Vance-Sterling denied his badge was used on the terminal, which is refuted by the 02:22 hardware log (CLUE-1003) and UV tracer powder on his cufflinks (CLUE-1005).',
      },
      {
        id: 'RULE-1004',
        statementId: 'STMT-VS3',
        clueId: 'CLUE-1007',
        verdict: 'CONTRADICTION',
        title: 'Micro-SIM Proves He Directed Culprits Across Cases 1–9',
        explanation:
          'Vance-Sterling denied any prior link to the previous culprits, whereas CLUE-1007 and CLUE-1001 prove he was Architect Zero orchestrating every single case.',
      },
    ],
    timeline: [
      {
        id: 'T10-1',
        time: '01:45',
        displayTime: '01:45 AM',
        title: 'Vance-Sterling Records 180-Second Webcam Loop',
        description: 'In the 4th-Floor Situation Room, Vance-Sterling records a loop of himself nodding at the camera (wall clock reflection reads 01:45).',
        source: 'Video Reflection Forensics',
        suspectId: 'director_vance_sterling',
        clueId: 'CLUE-1002',
        status: 'CONTRADICTED',
        conflictNote: 'Exposes the fabricated 02:00–02:45 video alibi.',
      },
      {
        id: 'T10-2',
        time: '02:20',
        displayTime: '02:20 AM',
        title: 'Enters Sub-Level 5 Faraday Cage (RF Drops to 0.0 dBm)',
        description: 'Vance-Sterling enters the air-gapped Faraday Core; his cardiac monitor logs zero RF.',
        source: 'Medical Telemetry Log',
        suspectId: 'director_vance_sterling',
        clueId: 'CLUE-1004',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes his denial of entering the Faraday Cage.',
      },
      {
        id: 'T10-3',
        time: '02:22',
        displayTime: '02:22 AM',
        title: 'Badge #BD-01 Halts Decryption & Ejects File Zero',
        description: 'Using his Executive Master Key #BD-01, Vance-Sterling aborts the 03:00 decryption, gets UV tracer powder on his cufflinks, and hides File Zero inside the bronze bust in his Command Booth.',
        source: 'Faraday Core Log & UV Tracer',
        suspectId: 'director_vance_sterling',
        clueId: 'CLUE-1003',
        status: 'CONTRADICTED',
        conflictNote: 'Proves Vance-Sterling stole File Zero.',
      },
    ],
    solution: {
      culpritId: 'director_vance_sterling',
      culpritName: 'Deputy Director Julian Vance-Sterling ("Architect Zero")',
      motiveSummary:
        'Deputy Director Vance-Sterling is "Architect Zero"—the mastermind who financed and extorted the culprits in Cases 1 through 9 using Bureau intelligence (CLUE-1001, CLUE-1007). When the culprits became liabilities, he assigned you to arrest them, then tried to steal File Zero before its 03:00 AM decryption exposed his master key #BD-01.',
      opportunitySummary:
        'He set up a pre-recorded 01:45 webcam loop in the 4th-Floor Situation Room (CLUE-1002), descended to the Sub-Level 5 Faraday Cage from 02:20 to 02:28 (logged by his cardiac monitor’s zero-RF drop in CLUE-1004), used Badge #BD-01 to eject File Zero at 02:22 (CLUE-1003), got UV tracer powder on his cufflinks (CLUE-1005), and hid the optical disk inside the hollow bronze bust in his Command Booth (CLUE-1006).',
      actualSequence: [
        '01:45 — Records a 3-minute video loop in the 4th-Floor Situation Room.',
        '02:20 — Enters the Sub-Level 5 Faraday Core (cardiac monitor logs 0.0 dBm RF).',
        '02:22 — Uses Executive Key #BD-01 to abort the decryption and eject the File Zero optical disk, transferring UV tracer powder to his cufflinks.',
        '02:27 — Conceals the File Zero disk inside the hollow bronze bust in his Command Booth before Commander Hale seals the blast doors at 02:31.',
      ],
      keyTargetLocation: 'Hollow marble plinth of the Bronze Distinguished Service Bust in the Command Booth.',
      decisiveClueIds: ['CLUE-1001', 'CLUE-1002', 'CLUE-1004', 'CLUE-1006'],
      motiveKeywords: ['architect', 'zero', 'syndicate', 'bd-01', 'mastermind', 'blackmail', 'bureau'],
      opportunityKeywords: ['loop', 'webcam', '01:45', 'faraday', 'cardiac', 'uv', 'cufflinks', 'bust'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'helen_park',
          reason: 'Planted the UV tracer and exposed the 01:45 spectacle reflection that caught Vance-Sterling.',
        },
        {
          suspectId: 'marcus_hale',
          reason: 'Locked down the blast doors at 02:31, trapping Vance-Sterling and the disk inside.',
        },
        {
          suspectId: 'simon_kane',
          reason: 'Uncovered the cross-case burner calls linking Badge #BD-01 to all nine previous heists.',
        },
      ],
    },
  },
];
