import { CaseDefinition } from '../../types/case';

export const CASES_4_TO_6: CaseDefinition[] = [
  // ============================================================================
  // LEVEL 4: THE VANISHING EVIDENCE
  // ============================================================================
  {
    id: 'case-004',
    levelNumber: 4,
    code: 'CASE-004',
    title: 'The Vanishing Evidence',
    subtitle: '14th Precinct Internal Affairs Evidence Room',
    difficulty: 'Challenging',
    timeLimitSeconds: 330,
    location: 'Precinct Vault C, 14th District Headquarters',
    date: 'November 8, 2026',
    timeframe: '07:30 – 08:30',
    premise:
      'Forty-five minutes before the grand jury indictment of the Vesper Smuggling Ring, Sealed Exhibit #409—an original signed whistleblower affidavit—vanished from inside the Precinct Chief’s steel evidence cage. The cage log shows only authorized internal personnel entered the annex.',
    crimeSceneDescription:
      'A fluorescent-lit precinct evidence annex lined with wire-mesh lockers, an industrial document shredder, a thermal coffee station, and a pneumatic evidence check-in counter.',
    crimeSceneZoneNames: ['Evidence Cage #4', 'Thermal Shredder Bin', 'Forensic Copier Tray', 'Precinct Sign-In Desk'],
    victimItem: {
      title: 'Sealed Exhibit #409 (Whistleblower Affidavit)',
      artistOrOwner: 'District Attorney Special Prosecution',
      yearOrCode: 'Exhibit #409-A',
      estimatedValue: 'Priceless (Key Trial Testimony)',
      mediumOrType: 'Tamper-evident Tyvek evidence pouch with red wax seal',
      description: 'Contains handwritten dockside bribery ledgers implicating corrupt port officials.',
    },
    hints: [
      'Check the Network Printer & Scanner Queue (CLUE-402) against ADA Mercer’s claim that he never used the annex copier.',
      'Inspect the Shredder Bin (CLUE-403)—what was actually shredded was a blank decoy pouch, not the real affidavit!',
      'Search ADA Mercer’s Expandable Trial Briefcase (CLUE-406) and compare with the Thermochromic Ink test (CLUE-404).',
    ],
    motiveOptions: [
      {
        id: 'm4_1',
        text: 'To suppress page 4 of the affidavit, which named the prosecutor’s brother-in-law as a silent partner in the dockside bribery ring.',
        isCorrect: true,
      },
      {
        id: 'm4_2',
        text: 'To sell the whistleblower’s identity to newspaper reporters for $50,000.',
        isCorrect: false,
      },
      {
        id: 'm4_3',
        text: 'To cover up an accidental coffee spill that ruined the evidence envelope.',
        isCorrect: false,
      },
      {
        id: 'm4_4',
        text: 'Retaliation against the Property Clerk for reporting overtime violations.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o4_1',
        text: 'Checked out Exhibit #408 at 07:52, used a heated butter knife from the breakroom to lift the wax seal on #409, shredded a decoy Tyvek envelope to fake destruction, and hid #409 inside a trial binder.',
        isCorrect: true,
      },
      {
        id: 'o4_2',
        text: 'Picked the evidence cage padlock using a paperclip at 08:15 while the clerk was asleep.',
        isCorrect: false,
      },
      {
        id: 'o4_3',
        text: 'Bribed the janitor to carry the affidavit out in a recycling sack at 07:35.',
        isCorrect: false,
      },
      {
        id: 'o4_4',
        text: 'Swapped the security camera tapes in the server room at 08:00.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'cole_mercer',
        name: 'Cole Mercer',
        role: 'Assistant District Attorney',
        age: 41,
        portraitTheme: 'curator',
        personality: 'Polished, theatrical, and fiercely protective of his political career.',
        relationshipToCase: 'Lead prosecutor assigned to present Exhibit #409 to the grand jury at 09:00.',
        possibleMotive: 'Page 4 of the affidavit implicates his brother-in-law’s customs brokerage.',
        initialAlibi: 'Claims he only inspected Exhibit #408 at the counter from 07:50 to 08:00 and never touched #409.',
        relevantKnowledge: [
          'Requested the clerk fetch coffee at 07:54, leaving him alone at the open cage window for 3 minutes.',
        ],
        publicStatement:
          'I signed out Exhibit #408 at 07:50 to review ballistic photos. I never touched Exhibit #409, and I certainly never used the scanner or shredder.',
        privateInformation:
          'He swapped #409 into his trial binder and fed a blank decoy Tyvek pouch into the shredder so the court would think the file was destroyed by a mole.',
        statements: [
          {
            id: 'STMT-CM1',
            suspectId: 'cole_mercer',
            topic: 'Scanner & Shredder Usage',
            quote: 'I never touched the annex document scanner or the shredder this morning; I stayed strictly at the counter.',
            timestampClaim: '07:50 – 08:00',
          },
          {
            id: 'STMT-CM2',
            suspectId: 'cole_mercer',
            topic: 'No Family Ties to Vesper Case',
            quote: 'Neither I nor anyone in my family has any connection to the port customs brokers named in Exhibit #409.',
          },
          {
            id: 'STMT-CM3',
            suspectId: 'cole_mercer',
            topic: 'Clerk Continuous Supervision',
            quote: 'Property Clerk Miller stood directly across from me at the cage window the entire ten minutes I was there.',
            timestampClaim: '07:50 – 08:00',
          },
        ],
        interrogationQA: [
          {
            question: 'Why did your badge log into the annex scanner at 07:55?',
            answer: 'I... I may have made a quick photocopy of a case cover sheet, nothing more!',
            keywords: ['scanner', 'copier', '07:55', 'badge', 'print'],
          },
          {
            question: 'Did you send Clerk Miller away for coffee at 07:54?',
            answer: 'I merely mentioned my throat was dry! It was his own choice to walk down the hall to the espresso machine.',
            keywords: ['coffee', 'miller', '07:54', 'alone', 'window'],
          },
          {
            question: 'Whose company is "Apex Customs Brokerage" on Page 4?',
            answer: 'That is my brother-in-law’s firm, yes, but he is an innocent businessman caught up in wild accusations!',
            keywords: ['brother', 'apex', 'page 4', 'family', 'motive'],
          },
        ],
      },
      {
        id: 'ray_miller',
        name: 'Sgt. Ray Miller',
        role: 'Precinct Property Clerk',
        age: 56,
        portraitTheme: 'security',
        personality: 'Gruff, weary, and defensive about his pension.',
        relationshipToCase: 'Custodian of Precinct Vault C.',
        possibleMotive: 'Blamed for leaving the cage window unlatched.',
        initialAlibi: 'Stepped to the breakroom for 3 minutes at 07:54 to get ADA Mercer a cup of coffee.',
        relevantKnowledge: [
          'Admits he left the inner cage wicket unlatched from 07:54 to 07:57 at Mercer’s request.',
        ],
        publicStatement:
          'Mercer begged me for a hot coffee at 07:54 because he had a sore throat. I stepped out for three minutes and forgot to latch the wire wicket.',
        privateInformation: 'Felt embarrassed about breaking protocol for a prosecutor.',
        statements: [
          {
            id: 'STMT-RM1',
            suspectId: 'ray_miller',
            topic: 'Three-Minute Coffee Absence',
            quote: 'At 07:54, ADA Mercer asked me to fetch him black coffee from the breakroom, leaving him alone by the open cage wicket until 07:57.',
            timestampClaim: '07:54 – 07:57',
          },
        ],
        interrogationQA: [
          {
            question: 'Was ADA Mercer left alone by the open cage?',
            answer: 'Yes, from 07:54 to 07:57. He asked me for coffee and I foolishly left the wire wicket unlatched.',
            keywords: ['alone', 'coffee', '07:54', 'wicket', 'mercer'],
          },
        ],
      },
      {
        id: 'nina_torres',
        name: 'Det. Nina Torres',
        role: 'Lead Port Investigator',
        age: 33,
        portraitTheme: 'restorer',
        personality: 'Relentless, idealistic, and furious that her evidence vanished.',
        relationshipToCase: 'Risked her life to obtain Exhibit #409 from the informant.',
        possibleMotive: 'None—she wants the syndicate convicted.',
        initialAlibi: 'In the 2nd-floor briefing room preparing grand jury slides.',
        relevantKnowledge: [
          'Kept a micro-dot backup index of the names on Page 4, including Apex Customs.',
        ],
        publicStatement:
          'I logged Exhibit #409 in last night with red wax. Page 4 named Apex Customs Brokerage—which is owned by ADA Mercer’s brother-in-law!',
        privateInformation: 'Suspected Mercer was stalling the subpoena.',
        statements: [
          {
            id: 'STMT-NT1',
            suspectId: 'nina_torres',
            topic: 'Contents of Page 4',
            quote: 'Page 4 of Exhibit #409 directly implicated Apex Customs Brokerage, owned by ADA Mercer’s brother-in-law.',
          },
        ],
        interrogationQA: [
          {
            question: 'Who is implicated on Page 4 of the affidavit?',
            answer: 'Apex Customs Brokerage—owned by Richard Vance, ADA Cole Mercer’s own brother-in-law!',
            keywords: ['page 4', 'implicate', 'apex', 'mercer'],
          },
        ],
      },
      {
        id: 'leo_vance',
        name: 'Leo Vance',
        role: 'Defense Paralegal',
        age: 28,
        portraitTheme: 'heir',
        personality: 'Slick and opportunistic.',
        relationshipToCase: 'Came to serve a discovery motion at the front desk.',
        possibleMotive: 'Represents one of the dockside defendants.',
        initialAlibi: 'Stopped at the outer metal detector; never entered the inner annex.',
        relevantKnowledge: ['Saw Mercer stuffing a thick Tyvek folder into a red trial binder at 08:01.'],
        publicStatement: 'I never got past the lobby turnstile! Ask the lobby guard.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-LV1',
            suspectId: 'leo_vance',
            topic: 'Lobby Turnstile Restriction',
            quote: 'My visitor pass never cleared the outer metal detector; I never entered the evidence annex.',
          },
        ],
        interrogationQA: [
          {
            question: 'Did you enter the evidence annex?',
            answer: 'Never! The lobby turnstile log proves I stayed in the public waiting area.',
            keywords: ['enter', 'annex', 'lobby', 'turnstile'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-401',
        title: 'Unlatched Cage Wicket & Coffee Cup Timestamp',
        category: 'log',
        description:
          'Breakroom smart-dispenser logs Sgt. Ray Miller pouring coffee at 07:55:10, confirming ADA Cole Mercer was completely alone at the unlatched evidence cage wicket between 07:54 and 07:57.',
        discoveryLocation: 'Breakroom Dispenser & Cage Window',
        relevantTimestamp: '07:54 – 07:57',
        establishes: 'Refutes Mercer’s claim that Clerk Miller watched him continuously; Mercer had 3 minutes alone with the open cage.',
        relatedSuspectIds: ['cole_mercer', 'ray_miller'],
        hotspotX: 25,
        hotspotY: 45,
      },
      {
        id: 'CLUE-402',
        title: 'Annex Scanner Memory Cache (07:55)',
        category: 'log',
        description:
          'Internal hard-drive cache on the annex multifunction copier logs Badge #DA-04 (Cole Mercer) scanning a blank Tyvek label at 07:55:30 to print a duplicate barcode sticker.',
        discoveryLocation: 'Annex Copier Hard Drive',
        relevantTimestamp: '07:55',
        establishes: 'Proves Mercer used the annex scanner at 07:55 to fabricate a decoy barcode label.',
        relatedSuspectIds: ['cole_mercer'],
        hotspotX: 62,
        hotspotY: 38,
      },
      {
        id: 'CLUE-403',
        title: 'Shredded Decoy Pouch in Shredder Bin',
        category: 'forensic',
        description:
          'Reconstructed strips from the shredder bin show a freshly printed barcode label on blank typing paper—NOT the watermarked cotton bond paper of Exhibit #409.',
        discoveryLocation: 'Annex Cross-Cut Shredder',
        relevantTimestamp: '07:56',
        establishes: 'The perpetrator shredded a fake decoy pouch so police would assume Exhibit #409 was destroyed, while smuggling the real document out intact.',
        relatedSuspectIds: ['cole_mercer'],
        hotspotX: 48,
        hotspotY: 70,
      },
      {
        id: 'CLUE-404',
        title: 'Red Sealing Wax Residue on Pocket Knife',
        category: 'forensic',
        description:
          'Microscopic crimson sealing wax matching Exhibit #409 found on the heated blade of ADA Mercer’s silver letter opener.',
        discoveryLocation: 'ADA Mercer’s Coat Pocket',
        establishes: 'Mercer sliced open Exhibit #409’s wax seal to remove Page 4.',
        relatedSuspectIds: ['cole_mercer'],
        hotspotX: 78,
        hotspotY: 55,
      },
      {
        id: 'CLUE-405',
        title: 'Corporate Registry: Apex Customs Brokerage',
        category: 'document',
        description:
          'State corporate filing showing ADA Cole Mercer holds a secret 30% silent trust stake in his brother-in-law’s firm, Apex Customs Brokerage—the exact entity named on Page 4.',
        discoveryLocation: 'Internal Affairs Database',
        establishes: 'Establishes Mercer’s direct financial and familial motive to suppress Page 4 of Exhibit #409.',
        relatedSuspectIds: ['cole_mercer', 'nina_torres'],
        hotspotX: 84,
        hotspotY: 25,
      },
      {
        id: 'CLUE-406',
        title: 'Original Exhibit #409 in Red Trial Binder',
        category: 'physical',
        description:
          'Tucked inside the false vinyl lining of ADA Cole Mercer’s locked trial binder is the intact original Exhibit #409 affidavit, with Page 4 folded back.',
        discoveryLocation: 'ADA Holding Room Briefcase',
        establishes: 'Cole Mercer is in physical possession of the stolen affidavit.',
        relatedSuspectIds: ['cole_mercer'],
        hotspotX: 35,
        hotspotY: 28,
      },
      {
        id: 'CLUE-407',
        title: 'Lobby Turnstile Electronic Gate Log',
        category: 'log',
        description: 'Confirms Defense Paralegal Leo Vance never passed the public lobby metal detector.',
        discoveryLocation: '1st Floor Security Desk',
        establishes: 'Exonerates Leo Vance.',
        relatedSuspectIds: ['leo_vance'],
        hotspotX: 15,
        hotspotY: 72,
      },
      {
        id: 'CLUE-408',
        title: ' Informant Micro-Dot Backup Copy',
        category: 'document',
        description: 'Det. Nina Torres’s backup index confirming Page 4 listed wire transfers to Apex Customs.',
        discoveryLocation: 'Detective Squad Safe',
        establishes: 'Confirms what Page 4 contained and why Mercer had to hide it.',
        relatedSuspectIds: ['nina_torres', 'cole_mercer'],
        hotspotX: 55,
        hotspotY: 20,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-401',
        statementId: 'STMT-CM1',
        clueId: 'CLUE-402',
        verdict: 'CONTRADICTION',
        title: 'Badge #DA-04 Logged on Annex Scanner at 07:55',
        explanation:
          'Mercer swore he never touched the annex scanner, but CLUE-402 proves his badge scanned the barcode label at 07:55:30.',
      },
      {
        id: 'RULE-402',
        statementId: 'STMT-CM2',
        clueId: 'CLUE-405',
        verdict: 'CONTRADICTION',
        title: 'Hidden 30% Stake in Apex Customs Brokerage',
        explanation:
          'Mercer denied any family or financial tie to the targets in Exhibit #409, which is refuted by CLUE-405 showing his 30% silent stake in his brother-in-law’s implicated firm.',
      },
      {
        id: 'RULE-403',
        statementId: 'STMT-CM3',
        clueId: 'CLUE-401',
        verdict: 'CONTRADICTION',
        title: 'Clerk Absent Fetching Coffee from 07:54 to 07:57',
        explanation:
          'Mercer claimed continuous supervision by Clerk Miller, but CLUE-401 proves Miller was in the breakroom pouring coffee for Mercer from 07:54 to 07:57.',
      },
    ],
    timeline: [
      {
        id: 'T4-1',
        time: '07:50',
        displayTime: '07:50 AM',
        title: 'ADA Mercer Signs Into Evidence Annex',
        description: 'Cole Mercer requests Exhibit #408 at the cage counter.',
        source: 'Annex Sign-In Ledger',
        suspectId: 'cole_mercer',
        status: 'CONFIRMED',
      },
      {
        id: 'T4-2',
        time: '07:54',
        displayTime: '07:54 AM',
        title: 'Mercer Sends Clerk Miller for Coffee',
        description: 'Miller leaves the wire wicket unlatched for 3 minutes.',
        source: 'Breakroom Dispenser Log',
        suspectId: 'ray_miller',
        clueId: 'CLUE-401',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Mercer’s claim that Miller never left the window.',
      },
      {
        id: 'T4-3',
        time: '07:55',
        displayTime: '07:55 AM',
        title: 'Decoy Barcode Duplicated & Shredded',
        description: 'Mercer reaches through the wicket, grabs #409, duplicates its barcode on the scanner, shreds a decoy pouch, and hides #409 in his binder.',
        source: 'Scanner Cache & Shredder Forensics',
        suspectId: 'cole_mercer',
        clueId: 'CLUE-402',
        status: 'CONTRADICTED',
        conflictNote: 'Proves Mercer used the scanner and staged the shredding.',
      },
    ],
    solution: {
      culpritId: 'cole_mercer',
      culpritName: 'ADA Cole Mercer (Lead Prosecutor)',
      motiveSummary:
        'Page 4 of Exhibit #409 implicated Apex Customs Brokerage—owned by Mercer’s brother-in-law and in which Mercer secretly held a 30% stake (CLUE-405).',
      opportunitySummary:
        'Mercer sent Clerk Miller for coffee at 07:54 (CLUE-401), reached through the unlatched cage wicket to take Exhibit #409, used the annex scanner at 07:55 (CLUE-402) to print a decoy barcode, shredded the blank decoy pouch (CLUE-403) so police would think the file was destroyed, and hid the real affidavit inside his red trial binder (CLUE-406).',
      actualSequence: [
        '07:50 — ADA Mercer arrives at the annex under the pretext of reviewing Exhibit #408.',
        '07:54 — He asks Clerk Miller for coffee, gaining 3 minutes alone by the unlatched wicket.',
        '07:55 — He takes Exhibit #409, scans its barcode onto a decoy envelope, and shreds the decoy.',
        '07:58 — He conceals the real affidavit inside his trial binder lining.',
      ],
      keyTargetLocation: 'Vinyl lining of ADA Cole Mercer’s red trial binder.',
      decisiveClueIds: ['CLUE-401', 'CLUE-402', 'CLUE-405', 'CLUE-406'],
      motiveKeywords: ['brother', 'apex', 'customs', 'page 4', 'stake', 'bribery', 'family'],
      opportunityKeywords: ['coffee', 'wicket', 'scanner', 'shredder', 'decoy', 'binder', '07:55'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'ray_miller',
          reason: 'Guilty only of a 3-minute protocol lapse while fetching coffee.',
        },
        {
          suspectId: 'nina_torres',
          reason: 'Provided the backup index that exposed Mercer’s conflict of interest.',
        },
        {
          suspectId: 'leo_vance',
          reason: 'Never passed the lobby metal detector (CLUE-407).',
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 5: THE MANSION MYSTERY
  // ============================================================================
  {
    id: 'case-005',
    levelNumber: 5,
    code: 'CASE-005',
    title: 'The Mansion Mystery',
    subtitle: 'Blackwood Island Storm Gathering',
    difficulty: 'Challenging',
    timeLimitSeconds: 360,
    location: 'Solarium Reading Room, Blackwood Manor',
    date: 'November 15, 2026',
    timeframe: '20:00 – 21:30',
    premise:
      'Cut off from the mainland by a coastal gale, Matriarch Eleanor Blackwood summoned four heirs to announce a new Holographic Codicil donating the family’s $40M timberlands to a conservation trust. At 21:00, when the reading box was unlocked, the original emerald-ink codicil had been replaced with a forged page dividing the land for commercial logging.',
    crimeSceneDescription:
      'A glass-domed Victorian solarium lashed by rain, containing a rosewood reading podium, an antique fountain pen desk, and French doors leading to the billiard room and cellar.',
    crimeSceneZoneNames: ['Rosewood Podium', 'Fountain Pen Desk', 'Billiard Room Clock', 'Boiler Room Furnace'],
    victimItem: {
      title: 'The Blackwood Emerald Codicil',
      artistOrOwner: 'Matriarch Eleanor Blackwood',
      yearOrCode: 'Codicil #BW-2026',
      estimatedValue: '$40,000,000 Estate Allocation',
      mediumOrType: 'Handwritten vellum parchment in rare Malachite-Green iron gall ink',
      description: 'Transfers all northern timberlands into an unbreakable conservation reserve.',
    },
    hints: [
      'Check the Ink Drying & Chromatography Report (CLUE-501)—the forged page was written less than 40 minutes ago using a left-handed oblique nib!',
      'Compare Solicitor Grant’s alibi with the Chime Clock tampering (CLUE-502) and the emerald ink stain inside his silk cuff (CLUE-505).',
      'Look inside the hollow brass telescope tube in the observatory alcove (CLUE-506).',
    ],
    motiveOptions: [
      {
        id: 'm5_1',
        text: 'To collect a secret $3M kickback contract from Nordic Timber Corp, which required the estate lands to be opened for logging.',
        isCorrect: true,
      },
      {
        id: 'm5_2',
        text: 'To build a private luxury golf resort on the southern cliffside.',
        isCorrect: false,
      },
      {
        id: 'm5_3',
        text: 'Out of spite over a childhood rivalry regarding the family sailboat.',
        isCorrect: false,
      },
      {
        id: 'm5_4',
        text: 'To hide the sale of antique manor tapestries.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o5_1',
        text: 'Set the Billiard Room grandfather clock ahead by 15 minutes to fake a 20:45 alibi with the guests, slipped into the solarium at 20:32 with the duplicate solicitor key, swapped the vellum page, and hid the original inside the brass telescope.',
        isCorrect: true,
      },
      {
        id: 'o5_2',
        text: 'Lowered a fishing line through the solarium skylight during the lightning storm.',
        isCorrect: false,
      },
      {
        id: 'o5_3',
        text: 'Bribed the chef to slip sleeping powder into the matriarch’s soup.',
        isCorrect: false,
      },
      {
        id: 'o5_4',
        text: 'Swapped the documents three weeks ago in the city law office.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'sebastian_grant',
        name: 'Sebastian Grant',
        role: 'Family Estate Solicitor',
        age: 49,
        portraitTheme: 'curator',
        personality: 'Urbane, pedantic, and calculating.',
        relationshipToCase: 'Drafted the estate documents and holds the duplicate brass key to the rosewood podium.',
        possibleMotive: 'Secretly signed a $3M finder’s fee agreement with Nordic Timber Corp if the conservation trust failed.',
        initialAlibi: 'Claims he was playing billiards with Nephew Julian when the grandfather clock struck 20:30 and 20:45.',
        relevantKnowledge: [
          'Writes left-handed with an oblique calligraphy nib.',
          'Set the billiard room clock 15 minutes fast at 20:15 so the 20:30 chime actually sounded at 20:15.',
        ],
        publicStatement:
          'I was in the Billiard Room with Julian when the clock chimed 20:30! Furthermore, I haven’t touched a bottle of malachite-green ink since last Friday.',
        privateInformation:
          'After the manipulated clock chimed "20:45" (actually 20:30), he left Julian and had 15 unaccounted minutes to swap the codicil in the solarium.',
        statements: [
          {
            id: 'STMT-SG1',
            suspectId: 'sebastian_grant',
            topic: 'Billiard Room Clock Alibi (20:30)',
            quote: 'Julian and I were together in the Billiard Room when the grandfather clock chimed 20:30 and 20:45.',
            timestampClaim: '20:30 – 20:45',
            locationClaim: 'Billiard Room',
          },
          {
            id: 'STMT-SG2',
            suspectId: 'sebastian_grant',
            topic: 'Malachite Ink Handling',
            quote: 'I have not touched or used malachite-green calligraphy ink anywhere in this house tonight.',
          },
          {
            id: 'STMT-SG3',
            suspectId: 'sebastian_grant',
            topic: 'Impartiality Toward Timber Sale',
            quote: 'As estate solicitor, I have zero financial interest in whether the timberlands are conserved or logged.',
          },
        ],
        interrogationQA: [
          {
            question: 'Why was the Billiard Room clock running 15 minutes fast?',
            answer: 'An old pendulum mechanism! Humid storm air often makes antique clocks race ahead.',
            keywords: ['clock', 'fast', '15', 'chime', 'billiard', 'alibi'],
          },
          {
            question: 'Why is there fresh wet malachite-green ink on your left cuff?',
            answer: 'A blot from last week when Matriarch Eleanor signed the draft, surely!',
            keywords: ['ink', 'green', 'malachite', 'cuff', 'left'],
          },
          {
            question: 'What is your connection to Nordic Timber Corp?',
            answer: 'I merely provided legal consultation on zoning laws. Any talk of a $3M commission is confidential!',
            keywords: ['nordic', 'timber', '3m', 'kickback', 'logging'],
          },
        ],
      },
      {
        id: 'claire_blackwood',
        name: 'Claire Blackwood',
        role: 'Environmental Biologist & Granddaughter',
        age: 30,
        portraitTheme: 'restorer',
        personality: 'Passionate and outspoken.',
        relationshipToCase: 'Proposed the conservation reserve to her grandmother.',
        possibleMotive: 'None—the original codicil fulfilled her life’s work; the forgery ruined it.',
        initialAlibi: 'Securing the storm shutters on the west veranda from 20:15 to 20:50.',
        relevantKnowledge: [
          'Notices the forged codicil has left-handed nib pressure marks.',
        ],
        publicStatement:
          'Why would I steal the very codicil that protected the forest? Look at the forgery—it was written by a left-handed calligrapher, and Sebastian Grant is the only left-handed person here!',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-CB1',
            suspectId: 'claire_blackwood',
            topic: 'Left-Handed Forgery Stroke',
            quote: 'The forged page shows left-handed oblique nib drag, and Solicitor Grant is the only left-handed writer in the manor.',
          },
        ],
        interrogationQA: [
          {
            question: 'What did you notice about the handwriting on the forgery?',
            answer: 'The cross-strokes pull from right to left—classic left-handed oblique calligraphy. Sebastian Grant is left-handed.',
            keywords: ['handwriting', 'left', 'nib', 'forgery', 'grant'],
          },
        ],
      },
      {
        id: 'julian_blackwood',
        name: 'Julian Blackwood',
        role: ' estranged Nephew',
        age: 35,
        portraitTheme: 'heir',
        personality: 'Lazy, cynical, and observant only of his drinks.',
        relationshipToCase: 'Stood to gain from commercial logging, making him the obvious scapegoat.',
        possibleMotive: 'Wanted logging royalties.',
        initialAlibi: 'Playing billiards with Solicitor Grant until Grant left right after the "20:45" chime.',
        relevantKnowledge: [
          'Confirms Grant abruptly left the billiard room immediately after the clock struck the third quarter-hour chime.',
        ],
        publicStatement:
          'Grant and I played billiards until the wall clock chimed 20:45, then Grant excused himself for fifteen minutes. Later I checked my wristwatch and realized the wall clock was 15 minutes fast!',
        privateInformation: 'Realized Grant used him as a time-shifted alibi witness.',
        statements: [
          {
            id: 'STMT-JB1',
            suspectId: 'julian_blackwood',
            topic: 'Clock Discrepancy with Wristwatch',
            quote: 'When the billiard clock chimed 20:45 and Grant walked out, my radio-synced wristwatch read only 20:30.',
            timestampClaim: '20:30',
          },
        ],
        interrogationQA: [
          {
            question: 'When did Solicitor Grant actually leave the Billiard Room?',
            answer: 'Right after the clock chimed 20:45—except my atomic wristwatch showed it was really 20:30! He set the clock ahead to fool me.',
            keywords: ['leave', 'clock', '20:30', '20:45', 'grant', 'watch'],
          },
        ],
      },
      {
        id: 'martha_vane',
        name: 'Martha Vane',
        role: 'Housekeeper',
        age: 58,
        portraitTheme: 'security',
        personality: 'Strict and protective of Matriarch Eleanor.',
        relationshipToCase: 'Wound the house clocks at 18:00.',
        possibleMotive: 'None.',
        initialAlibi: 'In the kitchen preparing hot cider with the matriarch.',
        relevantKnowledge: [
          'Verified all manor clocks were synchronized to the minute at 18:00.',
        ],
        publicStatement: 'Every clock in Blackwood Manor was dead-on accurate when I wound them at 18:00.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-MV1',
            suspectId: 'martha_vane',
            topic: '18:00 Clock Synchronization',
            quote: 'I synchronized the Billiard Room grandfather clock to radio time at 18:00 sharp.',
            timestampClaim: '18:00',
          },
        ],
        interrogationQA: [
          {
            question: 'Was the Billiard Room clock fast earlier today?',
            answer: 'No! At 18:00 it was accurate to the second. Someone manually pushed the minute hand forward 15 minutes.',
            keywords: ['clock', 'accurate', '18:00', 'hand'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-501',
        title: 'Fresh Malachite Ink & Left-Handed Nib Analysis',
        category: 'forensic',
        description:
          'Solvent test on the forged codicil proves the malachite-green iron gall ink was still oxidizing (written at ~20:35 tonight) and exhibits left-handed oblique nib pressure.',
        discoveryLocation: 'Solarium Rosewood Podium',
        relevantTimestamp: '20:35',
        establishes: 'The forgery was penned tonight around 20:35 by a left-handed writer.',
        relatedSuspectIds: ['sebastian_grant'],
        hotspotX: 48,
        hotspotY: 42,
      },
      {
        id: 'CLUE-502',
        title: 'Tampered Billiard Room Clock Hands',
        category: 'forensic',
        description:
          'Fingerprint powder on the Billiard Room grandfather clock dial reveals Sebastian Grant’s thumbprint on the minute hand, pushed 15 minutes ahead of real time.',
        discoveryLocation: 'Billiard Room Grandfather Clock',
        relevantTimestamp: '20:15 – 20:30',
        establishes: 'Grant advanced the clock 15 minutes so Julian would vouch for him until "20:45" when Grant actually left at 20:30.',
        relatedSuspectIds: ['sebastian_grant', 'julian_blackwood'],
        hotspotX: 22,
        hotspotY: 35,
      },
      {
        id: 'CLUE-503',
        title: 'Nordic Timber Corp $3M Kickback Contract',
        category: 'document',
        description:
          'Encrypted legal addendum in Sebastian Grant’s attaché case promising him a $3,000,000 bonus if the Blackwood conservation codicil is voided in favor of logging.',
        discoveryLocation: 'Guest Cloakroom Attaché Case',
        establishes: 'Establishes Grant’s $3M financial motive to replace the conservation codicil.',
        relatedSuspectIds: ['sebastian_grant'],
        hotspotX: 76,
        hotspotY: 62,
      },
      {
        id: 'CLUE-504',
        title: 'Duplicate Brass Podium Key with Wax Traces',
        category: 'physical',
        description:
          'Solicitor Grant’s duplicate rosewood podium key bears microscopic flecks of fresh beeswax polish applied to the solarium lock by the housekeeper at 19:45.',
        discoveryLocation: 'Sebastian Grant’s Waistcoat Pocket',
        relevantTimestamp: '20:32',
        establishes: 'Proves Grant’s key unlocked the rosewood podium after 19:45 tonight.',
        relatedSuspectIds: ['sebastian_grant'],
        hotspotX: 55,
        hotspotY: 68,
      },
      {
        id: 'CLUE-505',
        title: 'Wet Malachite Ink Smudge on Left Silk Cuff',
        category: 'forensic',
        description:
          'UV inspection of Sebastian Grant’s left French shirt cuff reveals a damp smear of malachite-green ink less than an hour old.',
        discoveryLocation: 'Solicitor’s Left Cuff',
        establishes: 'Refutes Grant’s claim that he hasn’t touched malachite ink since last week.',
        relatedSuspectIds: ['sebastian_grant'],
        hotspotX: 32,
        hotspotY: 54,
      },
      {
        id: 'CLUE-506',
        title: 'Original Codicil Inside Brass Telescope',
        category: 'physical',
        description:
          'Rolled inside the dew-shield of the brass celestial telescope in the solarium alcove is Matriarch Eleanor’s authentic Conservation Codicil.',
        discoveryLocation: 'Solarium Observatory Alcove',
        establishes: 'Recovers the authentic codicil hidden steps from the reading podium.',
        relatedSuspectIds: ['sebastian_grant'],
        hotspotX: 84,
        hotspotY: 30,
      },
      {
        id: 'CLUE-507',
        title: 'Kitchen Hearth Log (Martha & Eleanor)',
        category: 'log',
        description: 'Confirms Housekeeper Martha and Matriarch Eleanor were in the kitchen from 20:10 to 20:55.',
        discoveryLocation: 'Main Kitchen',
        establishes: 'Clears Martha Vane.',
        relatedSuspectIds: ['martha_vane'],
        hotspotX: 16,
        hotspotY: 70,
      },
      {
        id: 'CLUE-508',
        title: 'Storm Shutter Mud Tracks on West Veranda',
        category: 'physical',
        description: 'Confirms Claire Blackwood was outside bolting storm shutters during the 20:30 window.',
        discoveryLocation: 'West Veranda',
        establishes: 'Corroborates Claire Blackwood’s alibi.',
        relatedSuspectIds: ['claire_blackwood'],
        hotspotX: 65,
        hotspotY: 22,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-501',
        statementId: 'STMT-SG1',
        clueId: 'CLUE-502',
        verdict: 'CONTRADICTION',
        title: 'Falsified 20:45 Clock Alibi (Hands Pushed 15 Min Fast)',
        explanation:
          'Grant claimed he stayed with Julian until 20:45, but CLUE-502 reveals his thumbprint on the clock minute hand, pushed 15 minutes fast so he could leave at 20:30.',
      },
      {
        id: 'RULE-502',
        statementId: 'STMT-SG2',
        clueId: 'CLUE-505',
        verdict: 'CONTRADICTION',
        title: 'Damp Malachite Ink on Left Shirt Cuff',
        explanation:
          'Grant swore he hadn’t touched malachite ink tonight, which is directly contradicted by the wet emerald ink smear on his left cuff (CLUE-505).',
      },
      {
        id: 'RULE-503',
        statementId: 'STMT-SG3',
        clueId: 'CLUE-503',
        verdict: 'CONTRADICTION',
        title: 'Secret $3M Nordic Timber Kickback Agreement',
        explanation:
          'Grant claimed impartiality, whereas CLUE-503 proves he stood to collect $3,000,000 if the conservation codicil was replaced.',
      },
    ],
    timeline: [
      {
        id: 'T5-1',
        time: '18:00',
        displayTime: '06:00 PM',
        title: 'Manor Clocks Synchronized',
        description: 'Martha Vane winds and syncs all clocks to radio time.',
        source: 'Housekeeper Testimony',
        suspectId: 'martha_vane',
        status: 'CONFIRMED',
      },
      {
        id: 'T5-2',
        time: '20:15',
        displayTime: '08:15 PM',
        title: 'Grant Advances Billiard Clock by 15 Minutes',
        description: 'Before Julian enters, Grant pushes the clock hand forward 15 minutes.',
        source: 'Forensic Prints on Clock Dial',
        suspectId: 'sebastian_grant',
        clueId: 'CLUE-502',
        status: 'CONTRADICTED',
        conflictNote: 'Exposes the time-shifted alibi manipulation.',
      },
      {
        id: 'T5-3',
        time: '20:30',
        displayTime: '08:30 PM',
        title: 'Clock Strikes "20:45"; Grant Enters Solarium',
        description: 'At 20:30 real time (when the tampered clock chimes 20:45), Grant leaves Julian, unlocks the podium, swaps the codicil, and hides the original in the brass telescope.',
        source: 'Ink Oxidation & Key Beeswax',
        suspectId: 'sebastian_grant',
        clueId: 'CLUE-501',
        status: 'CONTRADICTED',
        conflictNote: 'Proves Grant had 15 unaccounted minutes to swap the vellum.',
      },
    ],
    solution: {
      culpritId: 'sebastian_grant',
      culpritName: 'Sebastian Grant (Estate Solicitor)',
      motiveSummary:
        'Grant secretly signed a $3,000,000 kickback contract with Nordic Timber Corp (CLUE-503) contingent on opening the Blackwood timberlands to commercial logging.',
      opportunitySummary:
        'He pushed the Billiard Room clock ahead 15 minutes (CLUE-502) to trick Julian into thinking he stayed until 20:45. Leaving at 20:30 real time, he penned the left-handed forgery in malachite ink (CLUE-501, CLUE-505), unlocked the podium with his duplicate key (CLUE-504), and hid the real codicil inside the brass telescope (CLUE-506).',
      actualSequence: [
        '20:15 — Grant advances the Billiard Room grandfather clock by 15 minutes.',
        '20:30 — The clock chimes 20:45; Grant excuses himself from Julian.',
        '20:32 — He unlocks the solarium podium with his duplicate key, swaps in his left-handed forgery, and hides the original inside the brass telescope.',
        '20:45 — He rejoins the household as if no time had elapsed.',
      ],
      keyTargetLocation: 'Dew-shield of the brass celestial telescope in the Solarium alcove.',
      decisiveClueIds: ['CLUE-501', 'CLUE-502', 'CLUE-503', 'CLUE-506'],
      motiveKeywords: ['timber', 'nordic', 'logging', '3m', 'kickback', 'commission'],
      opportunityKeywords: ['clock', '15', 'fast', 'left', 'ink', 'malachite', 'telescope', 'key'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'claire_blackwood',
          reason: 'Authored the conservation trust and was outside bolting storm shutters (CLUE-508).',
        },
        {
          suspectId: 'julian_blackwood',
          reason: 'Right-handed and was tricked by Grant’s clock manipulation.',
        },
        {
          suspectId: 'martha_vane',
          reason: 'In the kitchen with Matriarch Eleanor the entire time (CLUE-507).',
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 6: THE TRAIN CAR CONSPIRACY
  // ============================================================================
  {
    id: 'case-006',
    levelNumber: 6,
    code: 'CASE-006',
    title: 'The Train Car Conspiracy',
    subtitle: 'Trans-Alpine Express · Sleeping Car 4',
    difficulty: 'Challenging',
    timeLimitSeconds: 360,
    location: 'Compartment 4C, Trans-Alpine Express (St. Gotthard Tunnel)',
    date: 'November 21, 2026',
    timeframe: '22:10 – 22:25',
    premise:
      'As the high-speed Trans-Alpine Express entered the 12-minute St. Gotthard Base Tunnel at 22:10, Diplomatic Courier Henri Laurent locked his Compartment 4C to wash up in the end-car lavatory. When the train exited the tunnel at 22:22, his steel-chained leather attaché case had been swapped with an identical weighted replica.',
    crimeSceneDescription:
      'A walnut-paneled luxury sleeping car corridor with velvet carpeting, interconnected vestibule bellows, an attendant samovar pantry, and overhead luggage racks.',
    crimeSceneZoneNames: ['Compartment 4C Berth', 'Attendant Samovar Pantry', 'Vestibule Bellows', 'Dining Car Galley'],
    victimItem: {
      title: 'Diplomatic Cryptographic Attaché #EU-7',
      artistOrOwner: 'Geneva Diplomatic Mission',
      yearOrCode: 'Pouch #EU-7',
      estimatedValue: '$18,000,000 (Sovereign Bond Keys)',
      mediumOrType: 'Burgundy calfskin attaché with brass combination locks',
      description: 'Contains sovereign debt settlement drives bound for Milan.',
    },
    hints: [
      'Check how Compartment 4C was entered while Courier Laurent held his key: examine the Interconnecting Partition Bolt (CLUE-601) between 4C and 4D!',
      'Compare Baroness Karina’s claim that she slept in 4D with the Customs Weight Manifest (CLUE-602) and the lead shot pellets (CLUE-604).',
      'Inspect the false bottom of the silver samovar water tank in the pantry (CLUE-606).',
    ],
    motiveOptions: [
      {
        id: 'm6_1',
        text: 'To intercept the Geneva sovereign bond settlement codes and front-run the Monday morning currency market for $18M.',
        isCorrect: true,
      },
      {
        id: 'm6_2',
        text: 'To steal the courier’s diplomatic passport for a fugitive.',
        isCorrect: false,
      },
      {
        id: 'm6_3',
        text: 'To sabotage the railway company’s VIP security contract.',
        isCorrect: false,
      },
      {
        id: 'm6_4',
        text: 'A mistaken luggage swap by a confused tourist.',
        isCorrect: false,
      },
    ],
    opportunityOptions: [
      {
        id: 'o6_1',
        text: 'Used a flat watchmaker’s shim to unlatch the connecting partition door from Compartment 4D at 22:14, swapped the attaché with a lead-weighted twin brought through customs, and hid the real drive in a waterproof pouch inside the pantry samovar.',
        isCorrect: true,
      },
      {
        id: 'o6_2',
        text: 'Crawled along the exterior roof of the train at 200 km/h inside the tunnel.',
        isCorrect: false,
      },
      {
        id: 'o6_3',
        text: 'Unhooked the rear baggage car at a mountain siding.',
        isCorrect: false,
      },
      {
        id: 'o6_4',
        text: 'Bribed the train engineer to stop the train inside the tunnel.',
        isCorrect: false,
      },
    ],
    suspects: [
      {
        id: 'karina_vos',
        name: 'Karina Vos',
        role: 'Bond Arbitrage Broker (Occupant of 4D)',
        age: 37,
        portraitTheme: 'restorer',
        personality: 'Sophisticated, icy, and calculating.',
        relationshipToCase: 'Occupies Compartment 4D directly adjoining Courier Laurent’s 4C.',
        possibleMotive: 'Runs a high-leverage bond fund in Milan that bet $18M on the Geneva settlement rate.',
        initialAlibi: 'Claims she took a sleeping pill at 22:00 and never left 4D or opened the connecting partition.',
        relevantKnowledge: [
          'Boarded at Zurich with two identical burgundy calfskin attaché cases logged on the baggage scale.',
        ],
        publicStatement:
          'I was fast asleep in Compartment 4D throughout the tunnel passage. The connecting door between 4D and 4C was factory-bolted from both sides, and I only boarded with a single small handbag!',
        privateInformation:
          'She slipped a watchmaker’s spring steel shim through the partition molding to slide 4C’s latch open while Laurent was in the lavatory.',
        statements: [
          {
            id: 'STMT-KV1',
            suspectId: 'karina_vos',
            topic: 'Boarding Luggage Declaration',
            quote: 'I boarded in Zurich with only a small silk handbag; I never carried a burgundy leather attaché case onto this train.',
            locationClaim: 'Zurich Platform X-Ray',
          },
          {
            id: 'STMT-KV2',
            suspectId: 'karina_vos',
            topic: 'Connecting Door Between 4C & 4D',
            quote: 'The interconnecting door between my berth 4D and 4C remained untouched and sealed all night.',
            locationClaim: 'Compartment 4D Partition',
          },
          {
            id: 'STMT-KV3',
            suspectId: 'karina_vos',
            topic: 'Continuous Sleep in 4D (22:10–22:25)',
            quote: 'I was sound asleep in my berth from 22:00 onward and never stepped into the corridor or pantry.',
            timestampClaim: '22:00 – 22:25',
          },
        ],
        interrogationQA: [
          {
            question: 'Why did the Zurich customs X-ray log two burgundy attaché cases in your luggage?',
            answer: 'A clerical error at the platform scanner! Those cases were just empty sample portfolios.',
            keywords: ['luggage', 'zurich', 'xray', 'attache', 'case', 'two'],
          },
          {
            question: 'How did graphite lubricant get on the partition latch between 4D and 4C?',
            answer: 'Railway maintenance must have oiled the hinges! I never touched that partition door.',
            keywords: ['partition', 'door', '4d', 'latch', 'graphite', 'shim'],
          },
          {
            question: 'Why did the corridor sensor log 4D’s door opening at 22:17 toward the pantry?',
            answer: 'I... I may have stepped out half-asleep for a cup of chamomile water from the samovar!',
            keywords: ['pantry', 'samovar', '22:17', 'corridor', 'sleep'],
          },
        ],
      },
      {
        id: 'henri_laurent',
        name: 'Henri Laurent',
        role: 'Diplomatic Courier (Occupant of 4C)',
        age: 46,
        portraitTheme: 'curator',
        personality: 'Anxious, rule-bound, and frantic.',
        relationshipToCase: 'Victim of the swap; unchained the case for 6 minutes to go to the lavatory.',
        possibleMotive: 'Suspected of staging his own robbery.',
        initialAlibi: 'In the end-car lavatory from 22:12 to 22:18.',
        relevantKnowledge: [
          'Verified the exterior corridor door lock on 4C was unpicked.',
        ],
        publicStatement:
          'I locked 4C from the outside at 22:12 to wash my hands. When I returned at 22:18, the case looked identical—until I tried my combination at 22:22 and realized it was a lead-weighted decoy!',
        privateInformation: 'Embarrassed that he left the case in the berth instead of chained to his wrist.',
        statements: [
          {
            id: 'STMT-HL1',
            suspectId: 'henri_laurent',
            topic: 'Six-Minute Lavatory Absence',
            quote: 'I left 4C locked from 22:12 to 22:18 while in the lavatory.',
            timestampClaim: '22:12 – 22:18',
          },
        ],
        interrogationQA: [
          {
            question: 'Was the corridor door to 4C forced?',
            answer: 'No, the corridor lock was intact. The thief had to enter through the connecting partition wall from 4D!',
            keywords: ['door', 'corridor', 'lock', '4d', 'partition'],
          },
        ],
      },
      {
        id: 'pierre_moreau',
        name: 'Pierre Moreau',
        role: 'Sleeping Car Conductor',
        age: 54,
        portraitTheme: 'security',
        personality: 'Proud, observant, and meticulous.',
        relationshipToCase: 'Guards the Car 4 corridor.',
        possibleMotive: 'Holds the master corridor key.',
        initialAlibi: 'In Car 3 checking tickets from 22:08 to 22:20.',
        relevantKnowledge: [
          'Saw Karina Vos hurry back from the samovar pantry into 4D at 22:18 with wet sleeves.',
        ],
        publicStatement:
          'When I returned from Car 3 at 22:18, I saw Madame Vos slipping from the samovar pantry back into Compartment 4D.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-PM1',
            suspectId: 'pierre_moreau',
            topic: '22:18 Sighting of Karina Vos at Pantry',
            quote: 'At 22:18, I saw Karina Vos exit the samovar pantry and duck into Compartment 4D.',
            timestampClaim: '22:18',
          },
        ],
        interrogationQA: [
          {
            question: 'Who was in the corridor inside the tunnel?',
            answer: 'At 22:18, I saw Karina Vos stepping out of the samovar pantry and closing the door to 4D.',
            keywords: ['corridor', '22:18', 'karina', 'pantry', 'samovar'],
          },
        ],
      },
      {
        id: 'lukas_weber',
        name: 'Lukas Weber',
        role: 'horological Merchant (Occupant of 4B)',
        age: 60,
        portraitTheme: 'heir',
        personality: 'Fussy and protective of his watch cases.',
        relationshipToCase: 'Reported a missing spring-steel watchmaker’s shim from his toolkit at dinner.',
        possibleMotive: 'Has precision tools.',
        initialAlibi: 'Dining in the restaurant car with two customs officers from 21:45 to 22:30.',
        relevantKnowledge: [
          'Karina Vos sat next to his coat in the dining car at 21:30 where his toolkit pouch was stored.',
        ],
        publicStatement:
          'I was in the dining car with two Swiss border officers the whole time! Though I did notice one of my flat spring-steel shims was missing after Karina Vos brushed past my table.',
        privateInformation: 'None.',
        statements: [
          {
            id: 'STMT-LW1',
            suspectId: 'lukas_weber',
            topic: 'Dining Car Alibi with Border Officers',
            quote: 'I was seated in the restaurant car with two customs officials from 21:45 to 22:30.',
            timestampClaim: '21:45 – 22:30',
          },
        ],
        interrogationQA: [
          {
            question: 'Where were you when the train entered the tunnel?',
            answer: 'Having coffee in the restaurant car with two Swiss border guards—they can vouch for every second.',
            keywords: ['where', 'alibi', 'dining', 'tunnel'],
          },
        ],
      },
    ],
    clues: [
      {
        id: 'CLUE-601',
        title: 'Shimmed Partition Latch Between 4C & 4D',
        category: 'forensic',
        description:
          'The privacy deadbolt on the connecting door between Compartments 4C and 4D shows fresh graphite lubricant and parallel scratch marks from a 0.4mm spring-steel watchmaker’s shim operated from inside 4D.',
        discoveryLocation: 'Connecting Partition Door (4C/4D)',
        relevantTimestamp: '22:14',
        establishes: 'The intruder entered Compartment 4C directly from Karina Vos’s Compartment 4D.',
        relatedSuspectIds: ['karina_vos'],
        hotspotX: 45,
        hotspotY: 38,
      },
      {
        id: 'CLUE-602',
        title: 'Zurich Platform X-Ray Baggage Scan',
        category: 'log',
        description:
          'Zurich boarding security X-ray image of Karina Vos’s valise shows an empty burgundy calfskin attaché case packed alongside 2.4 kg of lead diving weights.',
        discoveryLocation: 'Zurich Customs Telemetry',
        relevantTimestamp: '20:40 Boarding',
        establishes: 'Proves Karina Vos boarded the train carrying the exact replica burgundy attaché case and lead weights.',
        relatedSuspectIds: ['karina_vos'],
        hotspotX: 20,
        hotspotY: 28,
      },
      {
        id: 'CLUE-603',
        title: 'Corridor Reed-Switch Door Log (Berth 4D)',
        category: 'log',
        description:
          'Automated carriage door sensor logs Compartment 4D’s corridor door opening at 22:17:05 and closing at 22:18:10, coinciding with Conductor Moreau seeing Karina exit the pantry.',
        discoveryLocation: 'Car 4 Electronic Diagnostics',
        relevantTimestamp: '22:17 – 22:18',
        establishes: 'Disproves Karina’s claim that she slept continuously in 4D through the tunnel.',
        relatedSuspectIds: ['karina_vos', 'pierre_moreau'],
        hotspotX: 62,
        hotspotY: 50,
      },
      {
        id: 'CLUE-604',
        title: 'Lead Shot Pellets in Decoy Attaché',
        category: 'physical',
        description:
          'Opening the decoy attaché left in 4C reveals 2.4 kg of lead diving pellets wrapped in a Milan financial newspaper bearing Karina Vos’s subscriber label.',
        discoveryLocation: 'Compartment 4C Berth',
        establishes: 'Ties the decoy attaché directly to Karina Vos.',
        relatedSuspectIds: ['karina_vos'],
        hotspotX: 35,
        hotspotY: 60,
      },
      {
        id: 'CLUE-605',
        title: 'Spring-Steel Shim in 4D Washbasin Trap',
        category: 'physical',
        description:
          'Recovered inside the drain U-bend of Compartment 4D’s private sink is Lukas Weber’s missing 0.4mm spring-steel shim coated in graphite.',
        discoveryLocation: 'Compartment 4D Sink Drain',
        establishes: 'Confirms Karina Vos used the shim inside 4D to unlock the partition to 4C.',
        relatedSuspectIds: ['karina_vos', 'lukas_weber'],
        hotspotX: 78,
        hotspotY: 42,
      },
      {
        id: 'CLUE-606',
        title: 'Encrypted Sovereign Drives in Samovar Tank',
        category: 'physical',
        description:
          'Suspended inside a waterproof latex pouch within the cold-water reservoir of the corridor’s silver samovar are the stolen Geneva cryptographic drives and cut leather panels of Courier Laurent’s attaché.',
        discoveryLocation: 'Car 4 Samovar Pantry',
        relevantTimestamp: '22:17',
        establishes: 'Recovers the stolen diplomatic drives where Karina Vos hid them at 22:17.',
        relatedSuspectIds: ['karina_vos'],
        hotspotX: 84,
        hotspotY: 68,
      },
      {
        id: 'CLUE-607',
        title: 'Milan Bond Fund Margin Position Sheet',
        category: 'document',
        description:
          'Encrypted tablet memo in 4D showing Karina Vos’s fund holding an $18M short position on Monday’s Geneva sovereign bond yield.',
        discoveryLocation: 'Compartment 4D Nightstand',
        establishes: 'Establishes Karina’s $18M insider-trading motive.',
        relatedSuspectIds: ['karina_vos'],
        hotspotX: 52,
        hotspotY: 22,
      },
      {
        id: 'CLUE-608',
        title: 'Dining Car Receipt & Border Officer Witness',
        category: 'document',
        description: 'Confirms Lukas Weber was in Car 1’s restaurant with Swiss customs officers from 21:45 to 22:30.',
        discoveryLocation: 'Restaurant Car Galley',
        establishes: 'Exonerates Lukas Weber.',
        relatedSuspectIds: ['lukas_weber'],
        hotspotX: 16,
        hotspotY: 75,
      },
    ],
    contradictionRules: [
      {
        id: 'RULE-601',
        statementId: 'STMT-KV1',
        clueId: 'CLUE-602',
        verdict: 'CONTRADICTION',
        title: 'Zurich X-Ray Proves Replica Attaché in Luggage',
        explanation:
          'Karina claimed she boarded with only a silk handbag, but CLUE-602 shows the replica burgundy attaché and 2.4kg of lead weights inside her valise at Zurich security.',
      },
      {
        id: 'RULE-602',
        statementId: 'STMT-KV2',
        clueId: 'CLUE-601',
        verdict: 'CONTRADICTION',
        title: 'Connecting Partition Shimmed Open from 4D',
        explanation:
          'Karina insisted the partition between 4D and 4C was untouched, whereas CLUE-601 and CLUE-605 prove it was shimmed open from her side.',
      },
      {
        id: 'RULE-603',
        statementId: 'STMT-KV3',
        clueId: 'CLUE-603',
        verdict: 'CONTRADICTION',
        title: '4D Door Logged Opening at 22:17 to Visit Samovar Pantry',
        explanation:
          'Karina claimed she slept continuously from 22:00, which is refuted by the 22:17 reed-switch door log (CLUE-603) and Conductor Moreau’s sighting.',
      },
    ],
    timeline: [
      {
        id: 'T6-1',
        time: '20:40',
        displayTime: '08:40 PM',
        title: 'Karina Boards in Zurich with Replica Attaché',
        description: 'Platform X-ray records replica burgundy case and lead weights in Karina’s valise.',
        source: 'Zurich X-Ray Log',
        suspectId: 'karina_vos',
        clueId: 'CLUE-602',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Karina’s claim that she boarded with only a small handbag.',
      },
      {
        id: 'T6-2',
        time: '22:12',
        displayTime: '10:12 PM',
        title: 'Courier Laurent Steps to End-Car Lavatory',
        description: 'Laurent locks 4C’s corridor door for 6 minutes.',
        source: 'Courier Testimony',
        suspectId: 'henri_laurent',
        status: 'CONFIRMED',
      },
      {
        id: 'T6-3',
        time: '22:14',
        displayTime: '10:14 PM',
        title: 'Partition Between 4D & 4C Shimmed Open',
        description: 'Karina uses the watchmaker’s shim to open the connecting partition from 4D and swaps the attaché cases.',
        source: 'Partition Forensics',
        suspectId: 'karina_vos',
        clueId: 'CLUE-601',
        status: 'CONTRADICTED',
        conflictNote: 'Refutes Karina’s claim that the partition remained sealed.',
      },
      {
        id: 'T6-4',
        time: '22:17',
        displayTime: '10:17 PM',
        title: 'Drives Hidden in Pantry Samovar Reservoir',
        description: 'Karina steps out of 4D and conceals the waterproof drive pouch inside the samovar water tank.',
        source: 'Door Reed-Switch & Conductor Sighting',
        suspectId: 'karina_vos',
        clueId: 'CLUE-603',
        status: 'CONTRADICTED',
        conflictNote: 'Disproves her sleeping alibi.',
      },
    ],
    solution: {
      culpritId: 'karina_vos',
      culpritName: 'Karina Vos (Bond Arbitrage Broker)',
      motiveSummary:
        'Karina held an $18M leveraged bond position (CLUE-607) and needed the Geneva sovereign debt settlement codes inside Courier Laurent’s attaché to front-run Monday’s market.',
      opportunitySummary:
        'She brought an identical lead-weighted burgundy attaché onto the train in Zurich (CLUE-602, CLUE-604). When Laurent stepped to the lavatory at 22:12 inside the St. Gotthard Tunnel, she shimmed open the connecting partition door from Compartment 4D (CLUE-601, CLUE-605), swapped the cases, and hid the real drives inside the corridor samovar tank at 22:17 (CLUE-603, CLUE-606).',
      actualSequence: [
        '20:40 — Boards at Zurich carrying a replica burgundy attaché and 2.4kg of lead weights.',
        '21:30 — Lifts a 0.4mm spring-steel shim from Lukas Weber’s coat in the dining car.',
        '22:14 — Shims open the connecting partition between 4D and 4C while Laurent is in the lavatory and swaps the attaché.',
        '22:17 — Hides the stolen drives inside a waterproof pouch in the pantry samovar tank.',
      ],
      keyTargetLocation: 'Cold-water reservoir of the silver samovar in the Car 4 pantry.',
      decisiveClueIds: ['CLUE-601', 'CLUE-602', 'CLUE-603', 'CLUE-606'],
      motiveKeywords: ['bond', 'geneva', 'arbitrage', '18m', 'market', 'milan'],
      opportunityKeywords: ['partition', 'shim', '4d', 'samovar', 'lead', 'replica', 'tunnel'],
      clearedSuspectsExplanation: [
        {
          suspectId: 'henri_laurent',
          reason: 'Victim of the partition breach during his 6-minute lavatory visit.',
        },
        {
          suspectId: 'pierre_moreau',
          reason: 'Was checking tickets in Car 3 and caught Karina returning from the pantry at 22:18.',
        },
        {
          suspectId: 'lukas_weber',
          reason: 'Seated with Swiss border officers in the dining car the entire time (CLUE-608).',
        },
      ],
    },
  },
];
