-- Avenor Medical seed data: 60 facilities, 286 jobs.
-- Run AFTER schema.sql. Idempotent (on conflict do nothing).

insert into facilities (id, source_id, name, city, state, type, ats_source) values
  ('9945b8b4-070b-5931-84d5-656f453ca524', 'seed-f1', 'HCA Medical City Dallas', 'Dallas', 'TX', 'Hospital', 'seed'),
  ('51f0813f-fb1a-5d45-9e19-0a8b910f7779', 'seed-f2', 'HCA Bay Area Medical Center', 'Corpus Christi', 'TX', 'Hospital', 'seed'),
  ('8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'seed-f3', 'HCA Chippenham Hospital', 'Richmond', 'VA', 'Hospital', 'seed'),
  ('9fa3cb3b-84dc-5aba-976d-e9abbe84099e', 'seed-f4', 'HCA Northside Hospital', 'St. Petersburg', 'FL', 'Hospital', 'seed'),
  ('ea2fb53b-1b1f-5444-9609-aba69f465090', 'seed-f5', 'HCA Trident Medical Center', 'Charleston', 'SC', 'Hospital', 'seed'),
  ('2eb87f45-ba12-5010-8447-b3208ff83fab', 'seed-f6', 'HCA Sunrise Hospital', 'Las Vegas', 'NV', 'Hospital', 'seed'),
  ('880de35b-c2fb-5d09-9da1-db640e950ba9', 'seed-f7', 'Ascension Seton Medical Center', 'Austin', 'TX', 'Hospital', 'seed'),
  ('38d51291-c256-52f5-a0a7-725ac152f790', 'seed-f8', 'Ascension St. Vincent', 'Indianapolis', 'IN', 'Hospital', 'seed'),
  ('c5542559-0784-5058-842c-2dbbaa5f8b03', 'seed-f9', 'Ascension Providence Rochester', 'Rochester', 'MI', 'Hospital', 'seed'),
  ('a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'seed-f10', 'CommonSpirit Dignity Health', 'San Francisco', 'CA', 'Hospital', 'seed'),
  ('ba0c90a5-6266-5d3b-9de6-ea9d9fc9e588', 'seed-f11', 'CommonSpirit CHI Memorial', 'Chattanooga', 'TN', 'Hospital', 'seed'),
  ('9c165d2f-97ff-532c-b792-f8bf262b6fcc', 'seed-f12', 'Tenet Detroit Medical Center', 'Detroit', 'MI', 'Hospital', 'seed'),
  ('13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'seed-f13', 'Tenet Baptist Health System', 'San Antonio', 'TX', 'Hospital', 'seed'),
  ('248e8be5-cb06-5c3e-9f19-4603a98464e0', 'seed-f14', 'Providence St. Joseph Hospital', 'Orange', 'CA', 'Hospital', 'seed'),
  ('0bfbc630-1633-5090-853a-73b074cac7bf', 'seed-f15', 'Providence Regional Medical Center', 'Everett', 'WA', 'Hospital', 'seed'),
  ('677cc63a-4678-5c9d-88dd-f01c8737ad67', 'seed-f16', 'Mayo Clinic', 'Rochester', 'MN', 'Hospital', 'seed'),
  ('8bfca8b7-6a00-52a6-8f52-d8a61e6db881', 'seed-f17', 'Mayo Clinic Arizona', 'Phoenix', 'AZ', 'Hospital', 'seed'),
  ('cecdfa09-728d-534e-b29c-09bace2248e3', 'seed-f18', 'Mayo Clinic Florida', 'Jacksonville', 'FL', 'Hospital', 'seed'),
  ('8ddeee78-a138-5b27-890c-26c38e9ece6b', 'seed-f19', 'Cleveland Clinic Main Campus', 'Cleveland', 'OH', 'Hospital', 'seed'),
  ('6723c6c2-8900-5fac-826d-c8bfe2cc1437', 'seed-f20', 'Cleveland Clinic Florida', 'Weston', 'FL', 'Hospital', 'seed'),
  ('8e95301f-108c-501b-b377-9a5dcf068947', 'seed-f21', 'Johns Hopkins Hospital', 'Baltimore', 'MD', 'Hospital', 'seed'),
  ('fcaec5bd-32d4-5323-aaf1-2df367656410', 'seed-f22', 'Massachusetts General Hospital', 'Boston', 'MA', 'Hospital', 'seed'),
  ('6bd5c5dc-c9b0-5356-990d-21ec28957498', 'seed-f23', 'Brigham and Women''s Hospital', 'Boston', 'MA', 'Hospital', 'seed'),
  ('66c192a4-14ba-530e-ad5b-61c19f35e4a1', 'seed-f24', 'NYU Langone Tisch Hospital', 'New York', 'NY', 'Hospital', 'seed'),
  ('1655ef34-fca5-5009-ab26-d1976ae55e4e', 'seed-f25', 'NewYork-Presbyterian', 'New York', 'NY', 'Hospital', 'seed'),
  ('3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'seed-f26', 'Mount Sinai Hospital', 'New York', 'NY', 'Hospital', 'seed'),
  ('ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'seed-f27', 'Cedars-Sinai Medical Center', 'Los Angeles', 'CA', 'Hospital', 'seed'),
  ('0801d6f9-d297-572b-a635-fdd1f4da7980', 'seed-f28', 'UCLA Ronald Reagan Medical Center', 'Los Angeles', 'CA', 'Hospital', 'seed'),
  ('e8cfde98-5568-50ca-bee2-90fa7afb191e', 'seed-f29', 'UCSF Medical Center', 'San Francisco', 'CA', 'Hospital', 'seed'),
  ('74851574-4ded-5a6d-8801-f23a0a3e83eb', 'seed-f30', 'Stanford Hospital', 'Palo Alto', 'CA', 'Hospital', 'seed'),
  ('9a09b50d-0c44-56d4-9d44-801acce3dff2', 'seed-f31', 'Northwestern Memorial Hospital', 'Chicago', 'IL', 'Hospital', 'seed'),
  ('e54263a8-1057-5b04-8732-ea667c6549c5', 'seed-f32', 'University of Chicago Medicine', 'Chicago', 'IL', 'Hospital', 'seed'),
  ('bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'seed-f33', 'Rush University Medical Center', 'Chicago', 'IL', 'Hospital', 'seed'),
  ('db69dd97-40e5-5349-a892-0ec306eca6af', 'seed-f34', 'Penn Presbyterian Medical Center', 'Philadelphia', 'PA', 'Hospital', 'seed'),
  ('366f3ada-573e-51b7-8c6f-987857e9665a', 'seed-f35', 'Duke University Hospital', 'Durham', 'NC', 'Hospital', 'seed'),
  ('dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'seed-f36', 'UNC Medical Center', 'Chapel Hill', 'NC', 'Hospital', 'seed'),
  ('7b053ac6-63e1-5baf-988d-4f5b41f08a5e', 'seed-f37', 'Vanderbilt University Medical Center', 'Nashville', 'TN', 'Hospital', 'seed'),
  ('6f2bce17-d4ab-50ae-b88a-e350490410ba', 'seed-f38', 'Emory University Hospital', 'Atlanta', 'GA', 'Hospital', 'seed'),
  ('b0071835-45d5-5fde-9319-786dd3777e39', 'seed-f39', 'Memorial Hermann-Texas Medical Center', 'Houston', 'TX', 'Hospital', 'seed'),
  ('93c3c5fe-3b8c-5ad2-b5d0-22e85d33f72e', 'seed-f40', 'Baylor University Medical Center', 'Dallas', 'TX', 'Hospital', 'seed'),
  ('3ff19ca3-b43d-51ac-b125-e3d92a3206b5', 'seed-f41', 'UT Southwestern Medical Center', 'Dallas', 'TX', 'Hospital', 'seed'),
  ('0e5a31cb-6b44-5ae1-a9a9-4cd088bade40', 'seed-f42', 'MD Anderson Cancer Center', 'Houston', 'TX', 'Hospital', 'seed'),
  ('c80a5927-f41d-5470-be02-7d4dafef29d3', 'seed-f43', 'Houston Methodist Hospital', 'Houston', 'TX', 'Hospital', 'seed'),
  ('b7bd43d4-020a-5a00-bd50-bf8ce414e82f', 'seed-f44', 'Texas Health Presbyterian', 'Dallas', 'TX', 'Hospital', 'seed'),
  ('d672a15b-98f1-57cb-b954-3e9608604076', 'seed-f45', 'Kaiser Permanente Oakland', 'Oakland', 'CA', 'Hospital', 'seed'),
  ('e0270cc4-aad0-5a75-aab1-174cb0dfde32', 'seed-f46', 'Kaiser Permanente Los Angeles', 'Los Angeles', 'CA', 'Hospital', 'seed'),
  ('0c09912d-69bc-57b5-92a7-8d062fbe7b64', 'seed-f47', 'Kaiser Permanente Denver', 'Denver', 'CO', 'Hospital', 'seed'),
  ('fd36b50f-c949-5e01-9892-21aac9878930', 'seed-f48', 'VA North Texas Health Care System', 'Dallas', 'TX', 'Hospital', 'seed'),
  ('9afb9f17-4318-5456-ba09-7be0680e2300', 'seed-f49', 'VA Palo Alto Health Care System', 'Palo Alto', 'CA', 'Hospital', 'seed'),
  ('ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'seed-f50', 'VA Puget Sound Health Care System', 'Seattle', 'WA', 'Hospital', 'seed'),
  ('72f9939e-c3aa-5407-a10c-2d370d1e131f', 'seed-f51', 'VA New York Harbor Healthcare', 'New York', 'NY', 'Hospital', 'seed'),
  ('dde04cdc-a5f7-5294-b849-eef5a5f39ae0', 'seed-f52', 'VA Chicago Healthcare System', 'Chicago', 'IL', 'Hospital', 'seed'),
  ('c678e9b8-c633-5bce-8469-fef08e06ccb9', 'seed-f53', 'SCA Surgical Care Affiliates - Dallas', 'Dallas', 'TX', 'Surgery Center', 'seed'),
  ('8284e749-2909-5501-b2ca-0c3653ea4086', 'seed-f54', 'Ambulatory Surgical Center of Miami', 'Miami', 'FL', 'Surgery Center', 'seed'),
  ('db29c879-8d57-5ab5-9bb4-a7888c2241c1', 'seed-f55', 'Genesis Healthcare - Meadow Ridge', 'Redding', 'CT', 'SNF', 'seed'),
  ('7811c108-d2af-5090-9c20-5b2ce63aed96', 'seed-f56', 'Brookdale Senior Living', 'Nashville', 'TN', 'SNF', 'seed'),
  ('f90c96cf-0f2b-583e-b790-35b4759a8895', 'seed-f57', 'Amedisys Home Health', 'Baton Rouge', 'LA', 'Home Health', 'seed'),
  ('ae2adcb3-29ee-5571-9b68-3c715f5e3aa9', 'seed-f58', 'LHC Group Home Health', 'Lafayette', 'LA', 'Home Health', 'seed'),
  ('b662023a-e72b-5ebf-8ebb-77ce1d43b504', 'seed-f59', 'Kaiser Permanente Denver Clinic', 'Denver', 'CO', 'Clinic', 'seed'),
  ('55673469-6270-53a5-88aa-b556a1576c60', 'seed-f60', 'Cottonwood Children''s Medical Group', 'Dallas', 'TX', 'Clinic', 'seed')
on conflict (source_id) do nothing;

insert into jobs (id, source, facility_id, title, profession, specialty, city, state, shift_type, hours_per_week, duration_weeks, rate_usd, job_type, visa_support, signing_bonus_usd, requirements, description, status, posted_at, last_seen_at) values
  ('seed::j1', 'seed', '9945b8b4-070b-5931-84d5-656f453ca524', 'L&D RN — Dallas', 'RN', 'Labor & Delivery', 'Dallas', 'TX', 'Night', 36, 13, 90, 'Travel', false, 3508, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• TX RN license (compact accepted)', '13-week travel contract at HCA Medical City Dallas. Housing + weekly stipend included.', 'open', now() - interval '4 days', now()),
  ('seed::j2', 'seed', '9945b8b4-070b-5931-84d5-656f453ca524', 'ICU RN — Dallas', 'RN', 'ICU', 'Dallas', 'TX', 'Night', 36, 13, 112, 'Travel', false, 2178, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active TX RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at HCA Medical City Dallas. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j3', 'seed', '9945b8b4-070b-5931-84d5-656f453ca524', 'Internal Medicine MD — Dallas', 'MD', 'Internal Medicine', 'Dallas', 'TX', 'Day', 40, null, 252, 'Permanent', true, 26041, '• MD/DO with IM board cert
• TX license
• Active DEA
• Visa sponsorship', 'Permanent position at HCA Medical City Dallas. Full benefits, retirement matching.', 'open', now() - interval '1 days', now()),
  ('seed::j4', 'seed', '9945b8b4-070b-5931-84d5-656f453ca524', 'PACU RN — Dallas', 'RN', 'PACU', 'Dallas', 'TX', 'Day', 40, 13, 78, 'Travel', false, 1947, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• TX RN license
• Housing stipend', '13-week travel contract at HCA Medical City Dallas. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j5', 'seed', '9945b8b4-070b-5931-84d5-656f453ca524', 'Telemetry RN — Dallas', 'RN', 'Telemetry', 'Dallas', 'TX', 'Night', 36, 13, 88, 'Travel', false, 2732, '• 1+ yr telemetry
• BLS, ACLS required
• TX RN license (compact accepted)', '13-week travel contract at HCA Medical City Dallas. Housing + weekly stipend included.', 'open', now() - interval '1 days', now()),
  ('seed::j6', 'seed', '9945b8b4-070b-5931-84d5-656f453ca524', 'Psychiatry MD — Dallas', 'MD', 'Psychiatry', 'Dallas', 'TX', 'Day', 40, null, 270, 'Permanent', true, 53462, '• MD/DO with Psychiatry board cert
• TX license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at HCA Medical City Dallas. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j7', 'seed', '51f0813f-fb1a-5d45-9e19-0a8b910f7779', 'Telemetry RN — Corpus Christi', 'RN', 'Telemetry', 'Corpus Christi', 'TX', 'Night', 36, 13, 72, 'Travel', false, 1826, '• 1+ yr telemetry
• BLS, ACLS required
• TX RN license (compact accepted)', '13-week travel contract at HCA Bay Area Medical Center. Housing + weekly stipend included.', 'open', now() - interval '14 days', now()),
  ('seed::j8', 'seed', '51f0813f-fb1a-5d45-9e19-0a8b910f7779', 'Urgent Care PA — Corpus Christi', 'PA', 'Urgent Care', 'Corpus Christi', 'TX', 'Rotating', 36, null, 86, 'Permanent', false, 7276, '• PA-C with TX license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at HCA Bay Area Medical Center. Full benefits, retirement matching.', 'open', now() - interval '5 days', now()),
  ('seed::j9', 'seed', '51f0813f-fb1a-5d45-9e19-0a8b910f7779', 'Hospitalist MD Locum — Corpus Christi', 'MD', 'Hospitalist', 'Corpus Christi', 'TX', 'Day', 36, 4, 238, 'Locums', false, 0, '• Active TX MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at HCA Bay Area Medical Center. Malpractice covered, travel included.', 'open', now() - interval '11 days', now()),
  ('seed::j10', 'seed', '51f0813f-fb1a-5d45-9e19-0a8b910f7779', 'PACU RN — Corpus Christi', 'RN', 'PACU', 'Corpus Christi', 'TX', 'Day', 40, 13, 79, 'Travel', false, 1689, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• TX RN license
• Housing stipend', '13-week travel contract at HCA Bay Area Medical Center. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j11', 'seed', '51f0813f-fb1a-5d45-9e19-0a8b910f7779', 'Neurology MD — Corpus Christi', 'MD', 'Neurology', 'Corpus Christi', 'TX', 'Day', 40, null, 287, 'Permanent', true, 58526, '• MD/DO with Neurology board cert
• TX license
• 3+ yrs preferred
• Visa support', 'Permanent position at HCA Bay Area Medical Center. Full benefits, retirement matching.', 'open', now() - interval '12 days', now()),
  ('seed::j12', 'seed', '8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'PACU RN — Richmond', 'RN', 'PACU', 'Richmond', 'VA', 'Day', 40, 13, 79, 'Travel', false, 3492, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• VA RN license
• Housing stipend', '13-week travel contract at HCA Chippenham Hospital. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j13', 'seed', '8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'Neurology MD — Richmond', 'MD', 'Neurology', 'Richmond', 'VA', 'Day', 40, null, 285, 'Permanent', true, 54213, '• MD/DO with Neurology board cert
• VA license
• 3+ yrs preferred
• Visa support', 'Permanent position at HCA Chippenham Hospital. Full benefits, retirement matching.', 'open', now() - interval '20 days', now()),
  ('seed::j14', 'seed', '8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'ER RN — Richmond', 'RN', 'ER', 'Richmond', 'VA', 'Rotating', 36, 13, 99, 'Travel', false, 2682, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• VA RN license (compact)', '13-week travel contract at HCA Chippenham Hospital. Housing + weekly stipend included.', 'open', now() - interval '7 days', now()),
  ('seed::j15', 'seed', '8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'Internal Medicine MD — Richmond', 'MD', 'Internal Medicine', 'Richmond', 'VA', 'Day', 40, null, 270, 'Permanent', true, 27279, '• MD/DO with IM board cert
• VA license
• Active DEA
• Visa sponsorship', 'Permanent position at HCA Chippenham Hospital. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j16', 'seed', '8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'Urgent Care PA — Richmond', 'PA', 'Urgent Care', 'Richmond', 'VA', 'Rotating', 36, null, 97, 'Permanent', false, 6866, '• PA-C with VA license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at HCA Chippenham Hospital. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j17', 'seed', '8aa24b65-4830-59f2-8df4-1c67d9e7e7c0', 'Hospitalist MD — Richmond', 'MD', 'Hospitalist', 'Richmond', 'VA', 'Day', 40, null, 255, 'Permanent', true, 58027, '• MD/DO with IM board cert
• Active VA license
• Active DEA
• Visa support available', 'Permanent position at HCA Chippenham Hospital. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j18', 'seed', '9fa3cb3b-84dc-5aba-976d-e9abbe84099e', 'Emergency Medicine PA — St. Petersburg', 'PA', 'Emergency Medicine', 'St. Petersburg', 'FL', 'Rotating', 40, null, 95, 'Permanent', false, 7664, '• PA-C with FL license
• ER or urgent care experience
• 2+ yrs preferred
• Sign-on bonus', 'Permanent position at HCA Northside Hospital. Full benefits, retirement matching.', 'open', now() - interval '12 days', now()),
  ('seed::j19', 'seed', '9fa3cb3b-84dc-5aba-976d-e9abbe84099e', 'PACU RN — St. Petersburg', 'RN', 'PACU', 'St. Petersburg', 'FL', 'Day', 40, 13, 87, 'Travel', false, 1929, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• FL RN license
• Housing stipend', '13-week travel contract at HCA Northside Hospital. Housing + weekly stipend included.', 'open', now() - interval '9 days', now()),
  ('seed::j20', 'seed', '9fa3cb3b-84dc-5aba-976d-e9abbe84099e', 'Urgent Care PA — St. Petersburg', 'PA', 'Urgent Care', 'St. Petersburg', 'FL', 'Rotating', 36, null, 98, 'Permanent', false, 5584, '• PA-C with FL license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at HCA Northside Hospital. Full benefits, retirement matching.', 'open', now() - interval '20 days', now()),
  ('seed::j21', 'seed', '9fa3cb3b-84dc-5aba-976d-e9abbe84099e', 'Interventional Cardiology MD — St. Petersburg', 'MD', 'Interventional Cardiology', 'St. Petersburg', 'FL', 'Day', 45, null, 466, 'Permanent', true, 71215, '• MD/DO with Interventional Cardiology fellowship
• FL license
• Board cert
• Signing + visa support', 'Permanent position at HCA Northside Hospital. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j22', 'seed', 'ea2fb53b-1b1f-5444-9609-aba69f465090', 'Telemetry RN — Charleston', 'RN', 'Telemetry', 'Charleston', 'SC', 'Night', 36, 13, 94, 'Travel', false, 2640, '• 1+ yr telemetry
• BLS, ACLS required
• SC RN license (compact accepted)', '13-week travel contract at HCA Trident Medical Center. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j23', 'seed', 'ea2fb53b-1b1f-5444-9609-aba69f465090', 'OR RN — Charleston', 'RN', 'OR', 'Charleston', 'SC', 'Day', 40, 8, 95, 'Travel', false, 2332, '• 1+ yr OR (orthopedics a plus)
• SC RN license
• CNOR preferred
• Completion bonus', '8-week travel contract at HCA Trident Medical Center. Housing + weekly stipend included.', 'open', now() - interval '2 days', now()),
  ('seed::j24', 'seed', 'ea2fb53b-1b1f-5444-9609-aba69f465090', 'Urgent Care PA — Charleston', 'PA', 'Urgent Care', 'Charleston', 'SC', 'Rotating', 36, null, 83, 'Permanent', false, 5262, '• PA-C with SC license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at HCA Trident Medical Center. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j25', 'seed', 'ea2fb53b-1b1f-5444-9609-aba69f465090', 'Emergency Medicine PA — Charleston', 'PA', 'Emergency Medicine', 'Charleston', 'SC', 'Rotating', 40, null, 97, 'Permanent', false, 9386, '• PA-C with SC license
• ER or urgent care experience
• 2+ yrs preferred
• Sign-on bonus', 'Permanent position at HCA Trident Medical Center. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j26', 'seed', 'ea2fb53b-1b1f-5444-9609-aba69f465090', 'PACU RN — Charleston', 'RN', 'PACU', 'Charleston', 'SC', 'Day', 40, 13, 82, 'Travel', false, 3370, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• SC RN license
• Housing stipend', '13-week travel contract at HCA Trident Medical Center. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j27', 'seed', 'ea2fb53b-1b1f-5444-9609-aba69f465090', 'Interventional Cardiology MD — Charleston', 'MD', 'Interventional Cardiology', 'Charleston', 'SC', 'Day', 45, null, 476, 'Permanent', true, 80622, '• MD/DO with Interventional Cardiology fellowship
• SC license
• Board cert
• Signing + visa support', 'Permanent position at HCA Trident Medical Center. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j28', 'seed', '2eb87f45-ba12-5010-8447-b3208ff83fab', 'CRNA — Las Vegas', 'CRNA', 'Anesthesiology', 'Las Vegas', 'NV', 'Day', 40, 13, 161, 'Travel', false, 3571, '• Active CRNA cert
• Active NV license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at HCA Sunrise Hospital. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j29', 'seed', '2eb87f45-ba12-5010-8447-b3208ff83fab', 'Emergency Medicine PA — Las Vegas', 'PA', 'Emergency Medicine', 'Las Vegas', 'NV', 'Rotating', 40, null, 107, 'Permanent', false, 13830, '• PA-C with NV license
• ER or urgent care experience
• 2+ yrs preferred
• Sign-on bonus', 'Permanent position at HCA Sunrise Hospital. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j30', 'seed', '2eb87f45-ba12-5010-8447-b3208ff83fab', 'Orthopedic Surgery MD — Las Vegas', 'MD', 'Orthopedic Surgery', 'Las Vegas', 'NV', 'Day', 45, null, 534, 'Permanent', true, 88077, '• MD/DO with Ortho board cert
• NV license
• Fellowship preferred
• Signing + visa', 'Permanent position at HCA Sunrise Hospital. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j31', 'seed', '2eb87f45-ba12-5010-8447-b3208ff83fab', 'Interventional Cardiology MD — Las Vegas', 'MD', 'Interventional Cardiology', 'Las Vegas', 'NV', 'Day', 45, null, 436, 'Permanent', true, 83723, '• MD/DO with Interventional Cardiology fellowship
• NV license
• Board cert
• Signing + visa support', 'Permanent position at HCA Sunrise Hospital. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j32', 'seed', '2eb87f45-ba12-5010-8447-b3208ff83fab', 'Urgent Care PA — Las Vegas', 'PA', 'Urgent Care', 'Las Vegas', 'NV', 'Rotating', 36, null, 80, 'Permanent', false, 9174, '• PA-C with NV license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at HCA Sunrise Hospital. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j33', 'seed', '2eb87f45-ba12-5010-8447-b3208ff83fab', 'NICU RN — Las Vegas', 'RN', 'NICU', 'Las Vegas', 'NV', 'Night', 36, null, 91, 'Permanent', false, 3385, '• Active NV RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at HCA Sunrise Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j34', 'seed', '880de35b-c2fb-5d09-9da1-db640e950ba9', 'Interventional Cardiology MD — Austin', 'MD', 'Interventional Cardiology', 'Austin', 'TX', 'Day', 45, null, 439, 'Permanent', true, 99086, '• MD/DO with Interventional Cardiology fellowship
• TX license
• Board cert
• Signing + visa support', 'Permanent position at Ascension Seton Medical Center. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j35', 'seed', '880de35b-c2fb-5d09-9da1-db640e950ba9', 'OR RN — Austin', 'RN', 'OR', 'Austin', 'TX', 'Day', 40, 8, 86, 'Travel', false, 2390, '• 1+ yr OR (orthopedics a plus)
• TX RN license
• CNOR preferred
• Completion bonus', '8-week travel contract at Ascension Seton Medical Center. Housing + weekly stipend included.', 'open', now() - interval '20 days', now()),
  ('seed::j36', 'seed', '880de35b-c2fb-5d09-9da1-db640e950ba9', 'Neurology MD — Austin', 'MD', 'Neurology', 'Austin', 'TX', 'Day', 40, null, 334, 'Permanent', true, 69676, '• MD/DO with Neurology board cert
• TX license
• 3+ yrs preferred
• Visa support', 'Permanent position at Ascension Seton Medical Center. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j37', 'seed', '880de35b-c2fb-5d09-9da1-db640e950ba9', 'Emergency Medicine MD — Austin', 'MD', 'Emergency Medicine', 'Austin', 'TX', 'Rotating', 36, null, 355, 'Permanent', true, 40752, '• MD/DO with EM board cert
• TX license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Ascension Seton Medical Center. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j38', 'seed', '38d51291-c256-52f5-a0a7-725ac152f790', 'Orthopedic Surgery MD — Indianapolis', 'MD', 'Orthopedic Surgery', 'Indianapolis', 'IN', 'Day', 45, null, 472, 'Permanent', true, 67310, '• MD/DO with Ortho board cert
• IN license
• Fellowship preferred
• Signing + visa', 'Permanent position at Ascension St. Vincent. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j39', 'seed', '38d51291-c256-52f5-a0a7-725ac152f790', 'Hospitalist MD — Indianapolis', 'MD', 'Hospitalist', 'Indianapolis', 'IN', 'Day', 40, null, 300, 'Permanent', true, 35182, '• MD/DO with IM board cert
• Active IN license
• Active DEA
• Visa support available', 'Permanent position at Ascension St. Vincent. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j40', 'seed', '38d51291-c256-52f5-a0a7-725ac152f790', 'Pediatric Hospitalist MD — Indianapolis', 'MD', 'Pediatric Hospitalist', 'Indianapolis', 'IN', 'Rotating', 40, null, 195, 'Permanent', true, 33630, '• MD/DO with Peds board cert
• IN license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at Ascension St. Vincent. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j41', 'seed', '38d51291-c256-52f5-a0a7-725ac152f790', 'PACU RN — Indianapolis', 'RN', 'PACU', 'Indianapolis', 'IN', 'Day', 40, 13, 100, 'Travel', false, 1865, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• IN RN license
• Housing stipend', '13-week travel contract at Ascension St. Vincent. Housing + weekly stipend included.', 'open', now() - interval '17 days', now()),
  ('seed::j42', 'seed', '38d51291-c256-52f5-a0a7-725ac152f790', 'LVN/LPN — Indianapolis', 'LPN', 'SNF / Long-Term Care', 'Indianapolis', 'IN', 'Night', 36, null, 35, 'Permanent', false, 2280, '• Active IN LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Ascension St. Vincent. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j43', 'seed', '38d51291-c256-52f5-a0a7-725ac152f790', 'Interventional Cardiology MD — Indianapolis', 'MD', 'Interventional Cardiology', 'Indianapolis', 'IN', 'Day', 45, null, 492, 'Permanent', true, 93270, '• MD/DO with Interventional Cardiology fellowship
• IN license
• Board cert
• Signing + visa support', 'Permanent position at Ascension St. Vincent. Full benefits, retirement matching.', 'open', now() - interval '20 days', now()),
  ('seed::j44', 'seed', 'c5542559-0784-5058-842c-2dbbaa5f8b03', 'NICU RN — Rochester', 'RN', 'NICU', 'Rochester', 'MI', 'Night', 36, null, 86, 'Permanent', false, 7906, '• Active MI RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Ascension Providence Rochester. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j45', 'seed', 'c5542559-0784-5058-842c-2dbbaa5f8b03', 'Family Medicine NP Locum — Rochester', 'NP', 'Family Medicine', 'Rochester', 'MI', 'Day', 36, 26, 113, 'Locums', false, 0, '• Active MI NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at Ascension Providence Rochester. Malpractice covered, travel included.', 'open', now() - interval '1 days', now()),
  ('seed::j46', 'seed', 'c5542559-0784-5058-842c-2dbbaa5f8b03', 'Pediatric Hospitalist MD — Rochester', 'MD', 'Pediatric Hospitalist', 'Rochester', 'MI', 'Rotating', 40, null, 202, 'Permanent', true, 36894, '• MD/DO with Peds board cert
• MI license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at Ascension Providence Rochester. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j47', 'seed', 'c5542559-0784-5058-842c-2dbbaa5f8b03', 'OR RN — Rochester', 'RN', 'OR', 'Rochester', 'MI', 'Day', 40, 8, 81, 'Travel', false, 2059, '• 1+ yr OR (orthopedics a plus)
• MI RN license
• CNOR preferred
• Completion bonus', '8-week travel contract at Ascension Providence Rochester. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j48', 'seed', 'a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'LVN/LPN — San Francisco', 'LPN', 'SNF / Long-Term Care', 'San Francisco', 'CA', 'Night', 36, null, 36, 'Permanent', false, 1262, '• Active CA LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at CommonSpirit Dignity Health. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j49', 'seed', 'a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'Med-Surg RN — San Francisco', 'RN', 'Med-Surg', 'San Francisco', 'CA', 'Day', 36, 13, 81, 'Travel', false, 1338, '• 1+ yr Med-Surg
• BLS required
• CA RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at CommonSpirit Dignity Health. Housing + weekly stipend included.', 'open', now() - interval '9 days', now()),
  ('seed::j50', 'seed', 'a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'Radiology MD — San Francisco', 'MD', 'Radiology', 'San Francisco', 'CA', 'Day', 40, null, 402, 'Permanent', true, 89753, '• MD/DO with Radiology board cert
• CA license
• Body/musculoskeletal fellowship preferred
• Signing + visa', 'Permanent position at CommonSpirit Dignity Health. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j51', 'seed', 'a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'Internal Medicine MD — San Francisco', 'MD', 'Internal Medicine', 'San Francisco', 'CA', 'Day', 40, null, 238, 'Permanent', true, 42671, '• MD/DO with IM board cert
• CA license
• Active DEA
• Visa sponsorship', 'Permanent position at CommonSpirit Dignity Health. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j52', 'seed', 'a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'CRNA — San Francisco', 'CRNA', 'Anesthesiology', 'San Francisco', 'CA', 'Day', 40, 13, 190, 'Travel', false, 4276, '• Active CRNA cert
• Active CA license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at CommonSpirit Dignity Health. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j53', 'seed', 'a14b4164-5d44-50af-aaf7-fcec3b0952a5', 'Orthopedic Surgery MD — San Francisco', 'MD', 'Orthopedic Surgery', 'San Francisco', 'CA', 'Day', 45, null, 480, 'Permanent', true, 88711, '• MD/DO with Ortho board cert
• CA license
• Fellowship preferred
• Signing + visa', 'Permanent position at CommonSpirit Dignity Health. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j54', 'seed', 'ba0c90a5-6266-5d3b-9de6-ea9d9fc9e588', 'L&D RN — Chattanooga', 'RN', 'Labor & Delivery', 'Chattanooga', 'TN', 'Night', 36, 13, 117, 'Travel', false, 2471, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• TN RN license (compact accepted)', '13-week travel contract at CommonSpirit CHI Memorial. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j55', 'seed', 'ba0c90a5-6266-5d3b-9de6-ea9d9fc9e588', 'Telemetry RN — Chattanooga', 'RN', 'Telemetry', 'Chattanooga', 'TN', 'Night', 36, 13, 79, 'Travel', false, 1514, '• 1+ yr telemetry
• BLS, ACLS required
• TN RN license (compact accepted)', '13-week travel contract at CommonSpirit CHI Memorial. Housing + weekly stipend included.', 'open', now() - interval '3 days', now()),
  ('seed::j56', 'seed', 'ba0c90a5-6266-5d3b-9de6-ea9d9fc9e588', 'Med-Surg RN — Chattanooga', 'RN', 'Med-Surg', 'Chattanooga', 'TN', 'Day', 36, 13, 86, 'Travel', false, 2292, '• 1+ yr Med-Surg
• BLS required
• TN RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at CommonSpirit CHI Memorial. Housing + weekly stipend included.', 'open', now() - interval '2 days', now()),
  ('seed::j57', 'seed', 'ba0c90a5-6266-5d3b-9de6-ea9d9fc9e588', 'Family Medicine NP — Chattanooga', 'NP', 'Family Medicine', 'Chattanooga', 'TN', 'Day', 36, null, 106, 'Permanent', false, 5552, '• Active TN NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at CommonSpirit CHI Memorial. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j58', 'seed', 'ba0c90a5-6266-5d3b-9de6-ea9d9fc9e588', 'ICU RN — Chattanooga', 'RN', 'ICU', 'Chattanooga', 'TN', 'Night', 36, 13, 99, 'Travel', false, 2145, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active TN RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at CommonSpirit CHI Memorial. Housing + weekly stipend included.', 'open', now() - interval '17 days', now()),
  ('seed::j59', 'seed', '9c165d2f-97ff-532c-b792-f8bf262b6fcc', 'PACU RN — Detroit', 'RN', 'PACU', 'Detroit', 'MI', 'Day', 40, 13, 93, 'Travel', false, 1770, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• MI RN license
• Housing stipend', '13-week travel contract at Tenet Detroit Medical Center. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j60', 'seed', '9c165d2f-97ff-532c-b792-f8bf262b6fcc', 'Emergency Medicine MD — Detroit', 'MD', 'Emergency Medicine', 'Detroit', 'MI', 'Rotating', 36, null, 358, 'Permanent', true, 70976, '• MD/DO with EM board cert
• MI license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Tenet Detroit Medical Center. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j61', 'seed', '9c165d2f-97ff-532c-b792-f8bf262b6fcc', 'CRNA — Detroit', 'CRNA', 'Anesthesiology', 'Detroit', 'MI', 'Day', 40, 13, 195, 'Travel', false, 4937, '• Active CRNA cert
• Active MI license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at Tenet Detroit Medical Center. Housing + weekly stipend included.', 'open', now() - interval '14 days', now()),
  ('seed::j62', 'seed', '9c165d2f-97ff-532c-b792-f8bf262b6fcc', 'Cath Lab RN — Detroit', 'RN', 'Cath Lab', 'Detroit', 'MI', 'Day', 40, 26, 94, 'Travel', false, 2693, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active MI RN license (compact)', '26-week travel contract at Tenet Detroit Medical Center. Housing + weekly stipend included.', 'open', now() - interval '4 days', now()),
  ('seed::j63', 'seed', '13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'Pediatric PA — San Antonio', 'PA', 'Pediatrics', 'San Antonio', 'TX', 'Day', 36, null, 69, 'Permanent', false, 6758, '• PA-C with active TX license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Tenet Baptist Health System. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j64', 'seed', '13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'Family Medicine NP Locum — San Antonio', 'NP', 'Family Medicine', 'San Antonio', 'TX', 'Day', 36, 26, 99, 'Locums', false, 0, '• Active TX NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at Tenet Baptist Health System. Malpractice covered, travel included.', 'open', now() - interval '13 days', now()),
  ('seed::j65', 'seed', '13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'LVN/LPN — San Antonio', 'LPN', 'SNF / Long-Term Care', 'San Antonio', 'TX', 'Night', 36, null, 42, 'Permanent', false, 1223, '• Active TX LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Tenet Baptist Health System. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j66', 'seed', '13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'Orthopedic Surgery MD — San Antonio', 'MD', 'Orthopedic Surgery', 'San Antonio', 'TX', 'Day', 45, null, 434, 'Permanent', true, 72465, '• MD/DO with Ortho board cert
• TX license
• Fellowship preferred
• Signing + visa', 'Permanent position at Tenet Baptist Health System. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j67', 'seed', '13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'Urgent Care PA — San Antonio', 'PA', 'Urgent Care', 'San Antonio', 'TX', 'Rotating', 36, null, 90, 'Permanent', false, 6148, '• PA-C with TX license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Tenet Baptist Health System. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j68', 'seed', '13428c3f-7f62-5e1f-8ac7-327a9e611b8f', 'Internal Medicine MD — San Antonio', 'MD', 'Internal Medicine', 'San Antonio', 'TX', 'Day', 40, null, 236, 'Permanent', true, 34127, '• MD/DO with IM board cert
• TX license
• Active DEA
• Visa sponsorship', 'Permanent position at Tenet Baptist Health System. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j69', 'seed', '248e8be5-cb06-5c3e-9f19-4603a98464e0', 'General Surgery MD — Orange', 'MD', 'General Surgery', 'Orange', 'CA', 'Day', 45, null, 408, 'Permanent', true, 76066, '• MD/DO with General Surgery board cert
• CA license
• 3+ yrs
• Signing + visa', 'Permanent position at Providence St. Joseph Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j70', 'seed', '248e8be5-cb06-5c3e-9f19-4603a98464e0', 'Radiology MD — Orange', 'MD', 'Radiology', 'Orange', 'CA', 'Day', 40, null, 341, 'Permanent', true, 92738, '• MD/DO with Radiology board cert
• CA license
• Body/musculoskeletal fellowship preferred
• Signing + visa', 'Permanent position at Providence St. Joseph Hospital. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j71', 'seed', '248e8be5-cb06-5c3e-9f19-4603a98464e0', 'Med-Surg RN — Orange', 'RN', 'Med-Surg', 'Orange', 'CA', 'Day', 36, 13, 64, 'Travel', false, 1191, '• 1+ yr Med-Surg
• BLS required
• CA RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at Providence St. Joseph Hospital. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j72', 'seed', '248e8be5-cb06-5c3e-9f19-4603a98464e0', 'Urgent Care PA — Orange', 'PA', 'Urgent Care', 'Orange', 'CA', 'Rotating', 36, null, 81, 'Permanent', false, 8329, '• PA-C with CA license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Providence St. Joseph Hospital. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j73', 'seed', '0bfbc630-1633-5090-853a-73b074cac7bf', 'Cath Lab RN — Everett', 'RN', 'Cath Lab', 'Everett', 'WA', 'Day', 40, 26, 93, 'Travel', false, 3276, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active WA RN license (compact)', '26-week travel contract at Providence Regional Medical Center. Housing + weekly stipend included.', 'open', now() - interval '1 days', now()),
  ('seed::j74', 'seed', '0bfbc630-1633-5090-853a-73b074cac7bf', 'General Surgery MD — Everett', 'MD', 'General Surgery', 'Everett', 'WA', 'Day', 45, null, 354, 'Permanent', true, 57380, '• MD/DO with General Surgery board cert
• WA license
• 3+ yrs
• Signing + visa', 'Permanent position at Providence Regional Medical Center. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j75', 'seed', '0bfbc630-1633-5090-853a-73b074cac7bf', 'Emergency Medicine PA — Everett', 'PA', 'Emergency Medicine', 'Everett', 'WA', 'Rotating', 40, null, 90, 'Permanent', false, 11930, '• PA-C with WA license
• ER or urgent care experience
• 2+ yrs preferred
• Sign-on bonus', 'Permanent position at Providence Regional Medical Center. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j76', 'seed', '0bfbc630-1633-5090-853a-73b074cac7bf', 'Orthopedic Surgery MD — Everett', 'MD', 'Orthopedic Surgery', 'Everett', 'WA', 'Day', 45, null, 509, 'Permanent', true, 70144, '• MD/DO with Ortho board cert
• WA license
• Fellowship preferred
• Signing + visa', 'Permanent position at Providence Regional Medical Center. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j77', 'seed', '0bfbc630-1633-5090-853a-73b074cac7bf', 'ER RN — Everett', 'RN', 'ER', 'Everett', 'WA', 'Rotating', 36, 13, 94, 'Travel', false, 1945, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• WA RN license (compact)', '13-week travel contract at Providence Regional Medical Center. Housing + weekly stipend included.', 'open', now() - interval '2 days', now()),
  ('seed::j78', 'seed', '677cc63a-4678-5c9d-88dd-f01c8737ad67', 'Internal Medicine MD — Rochester', 'MD', 'Internal Medicine', 'Rochester', 'MN', 'Day', 40, null, 228, 'Permanent', true, 44142, '• MD/DO with IM board cert
• MN license
• Active DEA
• Visa sponsorship', 'Permanent position at Mayo Clinic. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j79', 'seed', '677cc63a-4678-5c9d-88dd-f01c8737ad67', 'Hospitalist MD — Rochester', 'MD', 'Hospitalist', 'Rochester', 'MN', 'Day', 40, null, 309, 'Permanent', true, 57941, '• MD/DO with IM board cert
• Active MN license
• Active DEA
• Visa support available', 'Permanent position at Mayo Clinic. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j80', 'seed', '677cc63a-4678-5c9d-88dd-f01c8737ad67', 'ER RN — Rochester', 'RN', 'ER', 'Rochester', 'MN', 'Rotating', 36, 13, 86, 'Travel', false, 1616, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• MN RN license (compact)', '13-week travel contract at Mayo Clinic. Housing + weekly stipend included.', 'open', now() - interval '17 days', now()),
  ('seed::j81', 'seed', '677cc63a-4678-5c9d-88dd-f01c8737ad67', 'LVN/LPN — Rochester', 'LPN', 'SNF / Long-Term Care', 'Rochester', 'MN', 'Night', 36, null, 34, 'Permanent', false, 1380, '• Active MN LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Mayo Clinic. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j82', 'seed', '677cc63a-4678-5c9d-88dd-f01c8737ad67', 'Family Medicine NP — Rochester', 'NP', 'Family Medicine', 'Rochester', 'MN', 'Day', 36, null, 96, 'Permanent', false, 10531, '• Active MN NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at Mayo Clinic. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j83', 'seed', '677cc63a-4678-5c9d-88dd-f01c8737ad67', 'Orthopedic Surgery MD — Rochester', 'MD', 'Orthopedic Surgery', 'Rochester', 'MN', 'Day', 45, null, 488, 'Permanent', true, 67856, '• MD/DO with Ortho board cert
• MN license
• Fellowship preferred
• Signing + visa', 'Permanent position at Mayo Clinic. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j84', 'seed', '8bfca8b7-6a00-52a6-8f52-d8a61e6db881', 'Hospitalist MD Locum — Phoenix', 'MD', 'Hospitalist', 'Phoenix', 'AZ', 'Day', 36, 4, 251, 'Locums', false, 0, '• Active AZ MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at Mayo Clinic Arizona. Malpractice covered, travel included.', 'open', now() - interval '19 days', now()),
  ('seed::j85', 'seed', '8bfca8b7-6a00-52a6-8f52-d8a61e6db881', 'Cardiology MD — Phoenix', 'MD', 'Cardiology', 'Phoenix', 'AZ', 'Day', 40, null, 357, 'Permanent', true, 74261, '• MD/DO with Cardiology board cert
• AZ license
• 3+ yrs post-fellowship
• Visa sponsorship', 'Permanent position at Mayo Clinic Arizona. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j86', 'seed', '8bfca8b7-6a00-52a6-8f52-d8a61e6db881', 'ER RN — Phoenix', 'RN', 'ER', 'Phoenix', 'AZ', 'Rotating', 36, 13, 92, 'Travel', false, 1918, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• AZ RN license (compact)', '13-week travel contract at Mayo Clinic Arizona. Housing + weekly stipend included.', 'open', now() - interval '11 days', now()),
  ('seed::j87', 'seed', '8bfca8b7-6a00-52a6-8f52-d8a61e6db881', 'Med-Surg RN — Phoenix', 'RN', 'Med-Surg', 'Phoenix', 'AZ', 'Day', 36, 13, 71, 'Travel', false, 1543, '• 1+ yr Med-Surg
• BLS required
• AZ RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at Mayo Clinic Arizona. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j88', 'seed', 'cecdfa09-728d-534e-b29c-09bace2248e3', 'Emergency Medicine MD — Jacksonville', 'MD', 'Emergency Medicine', 'Jacksonville', 'FL', 'Rotating', 36, null, 325, 'Permanent', true, 44754, '• MD/DO with EM board cert
• FL license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Mayo Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '1 days', now()),
  ('seed::j89', 'seed', 'cecdfa09-728d-534e-b29c-09bace2248e3', 'Interventional Cardiology MD — Jacksonville', 'MD', 'Interventional Cardiology', 'Jacksonville', 'FL', 'Day', 45, null, 443, 'Permanent', true, 96896, '• MD/DO with Interventional Cardiology fellowship
• FL license
• Board cert
• Signing + visa support', 'Permanent position at Mayo Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j90', 'seed', 'cecdfa09-728d-534e-b29c-09bace2248e3', 'Home Health RN — Jacksonville', 'RN', 'Home Health', 'Jacksonville', 'FL', 'Day', 40, null, 50, 'Permanent', false, 4202, '• Active FL RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at Mayo Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j91', 'seed', 'cecdfa09-728d-534e-b29c-09bace2248e3', 'Urgent Care PA — Jacksonville', 'PA', 'Urgent Care', 'Jacksonville', 'FL', 'Rotating', 36, null, 92, 'Permanent', false, 7172, '• PA-C with FL license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Mayo Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '5 days', now()),
  ('seed::j92', 'seed', '8ddeee78-a138-5b27-890c-26c38e9ece6b', 'Orthopedic Surgery MD — Cleveland', 'MD', 'Orthopedic Surgery', 'Cleveland', 'OH', 'Day', 45, null, 425, 'Permanent', true, 88716, '• MD/DO with Ortho board cert
• OH license
• Fellowship preferred
• Signing + visa', 'Permanent position at Cleveland Clinic Main Campus. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j93', 'seed', '8ddeee78-a138-5b27-890c-26c38e9ece6b', 'Med-Surg RN — Cleveland', 'RN', 'Med-Surg', 'Cleveland', 'OH', 'Day', 36, 13, 86, 'Travel', false, 1619, '• 1+ yr Med-Surg
• BLS required
• OH RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at Cleveland Clinic Main Campus. Housing + weekly stipend included.', 'open', now() - interval '20 days', now()),
  ('seed::j94', 'seed', '8ddeee78-a138-5b27-890c-26c38e9ece6b', 'Telemetry RN — Cleveland', 'RN', 'Telemetry', 'Cleveland', 'OH', 'Night', 36, 13, 92, 'Travel', false, 2583, '• 1+ yr telemetry
• BLS, ACLS required
• OH RN license (compact accepted)', '13-week travel contract at Cleveland Clinic Main Campus. Housing + weekly stipend included.', 'open', now() - interval '1 days', now()),
  ('seed::j95', 'seed', '8ddeee78-a138-5b27-890c-26c38e9ece6b', 'Family Medicine NP Locum — Cleveland', 'NP', 'Family Medicine', 'Cleveland', 'OH', 'Day', 36, 26, 115, 'Locums', false, 0, '• Active OH NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at Cleveland Clinic Main Campus. Malpractice covered, travel included.', 'open', now() - interval '10 days', now()),
  ('seed::j96', 'seed', '8ddeee78-a138-5b27-890c-26c38e9ece6b', 'Home Health RN — Cleveland', 'RN', 'Home Health', 'Cleveland', 'OH', 'Day', 40, null, 69, 'Permanent', false, 2424, '• Active OH RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at Cleveland Clinic Main Campus. Full benefits, retirement matching.', 'open', now() - interval '5 days', now()),
  ('seed::j97', 'seed', '6723c6c2-8900-5fac-826d-c8bfe2cc1437', 'L&D RN — Weston', 'RN', 'Labor & Delivery', 'Weston', 'FL', 'Night', 36, 13, 99, 'Travel', false, 2577, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• FL RN license (compact accepted)', '13-week travel contract at Cleveland Clinic Florida. Housing + weekly stipend included.', 'open', now() - interval '20 days', now()),
  ('seed::j98', 'seed', '6723c6c2-8900-5fac-826d-c8bfe2cc1437', 'Orthopedic Surgery MD — Weston', 'MD', 'Orthopedic Surgery', 'Weston', 'FL', 'Day', 45, null, 438, 'Permanent', true, 107029, '• MD/DO with Ortho board cert
• FL license
• Fellowship preferred
• Signing + visa', 'Permanent position at Cleveland Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j99', 'seed', '6723c6c2-8900-5fac-826d-c8bfe2cc1437', 'Internal Medicine MD — Weston', 'MD', 'Internal Medicine', 'Weston', 'FL', 'Day', 40, null, 238, 'Permanent', true, 47527, '• MD/DO with IM board cert
• FL license
• Active DEA
• Visa sponsorship', 'Permanent position at Cleveland Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j100', 'seed', '6723c6c2-8900-5fac-826d-c8bfe2cc1437', 'Hospitalist MD — Weston', 'MD', 'Hospitalist', 'Weston', 'FL', 'Day', 40, null, 309, 'Permanent', true, 46008, '• MD/DO with IM board cert
• Active FL license
• Active DEA
• Visa support available', 'Permanent position at Cleveland Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j101', 'seed', '6723c6c2-8900-5fac-826d-c8bfe2cc1437', 'NICU RN — Weston', 'RN', 'NICU', 'Weston', 'FL', 'Night', 36, null, 89, 'Permanent', false, 3756, '• Active FL RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Cleveland Clinic Florida. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j102', 'seed', '8e95301f-108c-501b-b377-9a5dcf068947', 'ER RN — Baltimore', 'RN', 'ER', 'Baltimore', 'MD', 'Rotating', 36, 13, 92, 'Travel', false, 1830, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• MD RN license (compact)', '13-week travel contract at Johns Hopkins Hospital. Housing + weekly stipend included.', 'open', now() - interval '15 days', now()),
  ('seed::j103', 'seed', '8e95301f-108c-501b-b377-9a5dcf068947', 'ICU RN — Baltimore', 'RN', 'ICU', 'Baltimore', 'MD', 'Night', 36, 13, 113, 'Travel', false, 3445, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active MD RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at Johns Hopkins Hospital. Housing + weekly stipend included.', 'open', now() - interval '14 days', now()),
  ('seed::j104', 'seed', '8e95301f-108c-501b-b377-9a5dcf068947', 'Family Medicine NP — Baltimore', 'NP', 'Family Medicine', 'Baltimore', 'MD', 'Day', 36, null, 127, 'Permanent', false, 5079, '• Active MD NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at Johns Hopkins Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j105', 'seed', '8e95301f-108c-501b-b377-9a5dcf068947', 'Pediatric Hospitalist MD — Baltimore', 'MD', 'Pediatric Hospitalist', 'Baltimore', 'MD', 'Rotating', 40, null, 199, 'Permanent', true, 29884, '• MD/DO with Peds board cert
• MD license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at Johns Hopkins Hospital. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j106', 'seed', '8e95301f-108c-501b-b377-9a5dcf068947', 'NICU RN — Baltimore', 'RN', 'NICU', 'Baltimore', 'MD', 'Night', 36, null, 88, 'Permanent', false, 6024, '• Active MD RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Johns Hopkins Hospital. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j107', 'seed', 'fcaec5bd-32d4-5323-aaf1-2df367656410', 'NICU RN — Boston', 'RN', 'NICU', 'Boston', 'MA', 'Night', 36, null, 88, 'Permanent', false, 5931, '• Active MA RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Massachusetts General Hospital. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j108', 'seed', 'fcaec5bd-32d4-5323-aaf1-2df367656410', 'Pediatric PA — Boston', 'PA', 'Pediatrics', 'Boston', 'MA', 'Day', 36, null, 89, 'Permanent', false, 5022, '• PA-C with active MA license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Massachusetts General Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j109', 'seed', 'fcaec5bd-32d4-5323-aaf1-2df367656410', 'LVN/LPN — Boston', 'LPN', 'SNF / Long-Term Care', 'Boston', 'MA', 'Night', 36, null, 43, 'Permanent', false, 2146, '• Active MA LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Massachusetts General Hospital. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j110', 'seed', 'fcaec5bd-32d4-5323-aaf1-2df367656410', 'ER RN — Boston', 'RN', 'ER', 'Boston', 'MA', 'Rotating', 36, 13, 85, 'Travel', false, 3395, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• MA RN license (compact)', '13-week travel contract at Massachusetts General Hospital. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j111', 'seed', 'fcaec5bd-32d4-5323-aaf1-2df367656410', 'Home Health RN — Boston', 'RN', 'Home Health', 'Boston', 'MA', 'Day', 40, null, 53, 'Permanent', false, 2725, '• Active MA RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at Massachusetts General Hospital. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j112', 'seed', 'fcaec5bd-32d4-5323-aaf1-2df367656410', 'Family Medicine NP Locum — Boston', 'NP', 'Family Medicine', 'Boston', 'MA', 'Day', 36, 26, 98, 'Locums', false, 0, '• Active MA NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at Massachusetts General Hospital. Malpractice covered, travel included.', 'open', now() - interval '6 days', now()),
  ('seed::j113', 'seed', '6bd5c5dc-c9b0-5356-990d-21ec28957498', 'Radiology MD — Boston', 'MD', 'Radiology', 'Boston', 'MA', 'Day', 40, null, 445, 'Permanent', true, 66263, '• MD/DO with Radiology board cert
• MA license
• Body/musculoskeletal fellowship preferred
• Signing + visa', 'Permanent position at Brigham and Women''s Hospital. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j114', 'seed', '6bd5c5dc-c9b0-5356-990d-21ec28957498', 'Family Medicine NP — Boston', 'NP', 'Family Medicine', 'Boston', 'MA', 'Day', 36, null, 102, 'Permanent', false, 11450, '• Active MA NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at Brigham and Women''s Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j115', 'seed', '6bd5c5dc-c9b0-5356-990d-21ec28957498', 'Neurology MD — Boston', 'MD', 'Neurology', 'Boston', 'MA', 'Day', 40, null, 323, 'Permanent', true, 37537, '• MD/DO with Neurology board cert
• MA license
• 3+ yrs preferred
• Visa support', 'Permanent position at Brigham and Women''s Hospital. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j116', 'seed', '6bd5c5dc-c9b0-5356-990d-21ec28957498', 'Pediatric PA — Boston', 'PA', 'Pediatrics', 'Boston', 'MA', 'Day', 36, null, 75, 'Permanent', false, 4817, '• PA-C with active MA license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Brigham and Women''s Hospital. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j117', 'seed', '6bd5c5dc-c9b0-5356-990d-21ec28957498', 'Orthopedic Surgery MD — Boston', 'MD', 'Orthopedic Surgery', 'Boston', 'MA', 'Day', 45, null, 474, 'Permanent', true, 80000, '• MD/DO with Ortho board cert
• MA license
• Fellowship preferred
• Signing + visa', 'Permanent position at Brigham and Women''s Hospital. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j118', 'seed', '6bd5c5dc-c9b0-5356-990d-21ec28957498', 'Emergency Medicine MD — Boston', 'MD', 'Emergency Medicine', 'Boston', 'MA', 'Rotating', 36, null, 313, 'Permanent', true, 41550, '• MD/DO with EM board cert
• MA license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Brigham and Women''s Hospital. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j119', 'seed', '66c192a4-14ba-530e-ad5b-61c19f35e4a1', 'Family Medicine NP — New York', 'NP', 'Family Medicine', 'New York', 'NY', 'Day', 36, null, 109, 'Permanent', false, 7876, '• Active NY NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at NYU Langone Tisch Hospital. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j120', 'seed', '66c192a4-14ba-530e-ad5b-61c19f35e4a1', 'PACU RN — New York', 'RN', 'PACU', 'New York', 'NY', 'Day', 40, 13, 88, 'Travel', false, 2891, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• NY RN license
• Housing stipend', '13-week travel contract at NYU Langone Tisch Hospital. Housing + weekly stipend included.', 'open', now() - interval '18 days', now()),
  ('seed::j121', 'seed', '66c192a4-14ba-530e-ad5b-61c19f35e4a1', 'General Surgery MD — New York', 'MD', 'General Surgery', 'New York', 'NY', 'Day', 45, null, 347, 'Permanent', true, 41808, '• MD/DO with General Surgery board cert
• NY license
• 3+ yrs
• Signing + visa', 'Permanent position at NYU Langone Tisch Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j122', 'seed', '66c192a4-14ba-530e-ad5b-61c19f35e4a1', 'Med-Surg RN — New York', 'RN', 'Med-Surg', 'New York', 'NY', 'Day', 36, 13, 72, 'Travel', false, 1365, '• 1+ yr Med-Surg
• BLS required
• NY RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at NYU Langone Tisch Hospital. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j123', 'seed', '66c192a4-14ba-530e-ad5b-61c19f35e4a1', 'LVN/LPN — New York', 'LPN', 'SNF / Long-Term Care', 'New York', 'NY', 'Night', 36, null, 40, 'Permanent', false, 1078, '• Active NY LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at NYU Langone Tisch Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j124', 'seed', '1655ef34-fca5-5009-ab26-d1976ae55e4e', 'Pediatric PA — New York', 'PA', 'Pediatrics', 'New York', 'NY', 'Day', 36, null, 87, 'Permanent', false, 6094, '• PA-C with active NY license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at NewYork-Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j125', 'seed', '1655ef34-fca5-5009-ab26-d1976ae55e4e', 'Family Medicine NP Locum — New York', 'NP', 'Family Medicine', 'New York', 'NY', 'Day', 36, 26, 110, 'Locums', false, 0, '• Active NY NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at NewYork-Presbyterian. Malpractice covered, travel included.', 'open', now() - interval '19 days', now()),
  ('seed::j126', 'seed', '1655ef34-fca5-5009-ab26-d1976ae55e4e', 'Internal Medicine MD — New York', 'MD', 'Internal Medicine', 'New York', 'NY', 'Day', 40, null, 237, 'Permanent', true, 33346, '• MD/DO with IM board cert
• NY license
• Active DEA
• Visa sponsorship', 'Permanent position at NewYork-Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j127', 'seed', '1655ef34-fca5-5009-ab26-d1976ae55e4e', 'Neurology MD — New York', 'MD', 'Neurology', 'New York', 'NY', 'Day', 40, null, 330, 'Permanent', true, 35110, '• MD/DO with Neurology board cert
• NY license
• 3+ yrs preferred
• Visa support', 'Permanent position at NewYork-Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j128', 'seed', '1655ef34-fca5-5009-ab26-d1976ae55e4e', 'Family Medicine NP — New York', 'NP', 'Family Medicine', 'New York', 'NY', 'Day', 36, null, 126, 'Permanent', false, 10626, '• Active NY NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at NewYork-Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j129', 'seed', '1655ef34-fca5-5009-ab26-d1976ae55e4e', 'LVN/LPN — New York', 'LPN', 'SNF / Long-Term Care', 'New York', 'NY', 'Night', 36, null, 43, 'Permanent', false, 1883, '• Active NY LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at NewYork-Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j130', 'seed', '3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'Radiology MD — New York', 'MD', 'Radiology', 'New York', 'NY', 'Day', 40, null, 427, 'Permanent', true, 69681, '• MD/DO with Radiology board cert
• NY license
• Body/musculoskeletal fellowship preferred
• Signing + visa', 'Permanent position at Mount Sinai Hospital. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j131', 'seed', '3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'Family Medicine NP — New York', 'NP', 'Family Medicine', 'New York', 'NY', 'Day', 36, null, 111, 'Permanent', false, 10463, '• Active NY NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at Mount Sinai Hospital. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j132', 'seed', '3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'Cardiology MD — New York', 'MD', 'Cardiology', 'New York', 'NY', 'Day', 40, null, 326, 'Permanent', true, 66371, '• MD/DO with Cardiology board cert
• NY license
• 3+ yrs post-fellowship
• Visa sponsorship', 'Permanent position at Mount Sinai Hospital. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j133', 'seed', '3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'LVN/LPN — New York', 'LPN', 'SNF / Long-Term Care', 'New York', 'NY', 'Night', 36, null, 36, 'Permanent', false, 1392, '• Active NY LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Mount Sinai Hospital. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j134', 'seed', '3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'Emergency Medicine MD — New York', 'MD', 'Emergency Medicine', 'New York', 'NY', 'Rotating', 36, null, 370, 'Permanent', true, 64847, '• MD/DO with EM board cert
• NY license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Mount Sinai Hospital. Full benefits, retirement matching.', 'open', now() - interval '6 days', now()),
  ('seed::j135', 'seed', '3b673abd-22c4-51f8-8eff-4b892e5a5b52', 'L&D RN — New York', 'RN', 'Labor & Delivery', 'New York', 'NY', 'Night', 36, 13, 118, 'Travel', false, 2616, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• NY RN license (compact accepted)', '13-week travel contract at Mount Sinai Hospital. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j136', 'seed', 'ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'Psychiatry MD — Los Angeles', 'MD', 'Psychiatry', 'Los Angeles', 'CA', 'Day', 40, null, 286, 'Permanent', true, 45236, '• MD/DO with Psychiatry board cert
• CA license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at Cedars-Sinai Medical Center. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j137', 'seed', 'ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'ICU RN — Los Angeles', 'RN', 'ICU', 'Los Angeles', 'CA', 'Night', 36, 13, 106, 'Travel', false, 3383, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active CA RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at Cedars-Sinai Medical Center. Housing + weekly stipend included.', 'open', now() - interval '7 days', now()),
  ('seed::j138', 'seed', 'ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'Home Health RN — Los Angeles', 'RN', 'Home Health', 'Los Angeles', 'CA', 'Day', 40, null, 64, 'Permanent', false, 3938, '• Active CA RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at Cedars-Sinai Medical Center. Full benefits, retirement matching.', 'open', now() - interval '6 days', now()),
  ('seed::j139', 'seed', 'ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'Orthopedic Surgery MD — Los Angeles', 'MD', 'Orthopedic Surgery', 'Los Angeles', 'CA', 'Day', 45, null, 406, 'Permanent', true, 78598, '• MD/DO with Ortho board cert
• CA license
• Fellowship preferred
• Signing + visa', 'Permanent position at Cedars-Sinai Medical Center. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j140', 'seed', 'ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'Cath Lab RN — Los Angeles', 'RN', 'Cath Lab', 'Los Angeles', 'CA', 'Day', 40, 26, 109, 'Travel', false, 3796, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active CA RN license (compact)', '26-week travel contract at Cedars-Sinai Medical Center. Housing + weekly stipend included.', 'open', now() - interval '20 days', now()),
  ('seed::j141', 'seed', 'ddf159af-d9f2-5dd5-a5fb-84808221e65d', 'Pediatric PA — Los Angeles', 'PA', 'Pediatrics', 'Los Angeles', 'CA', 'Day', 36, null, 78, 'Permanent', false, 4382, '• PA-C with active CA license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Cedars-Sinai Medical Center. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j142', 'seed', '0801d6f9-d297-572b-a635-fdd1f4da7980', 'Home Health RN — Los Angeles', 'RN', 'Home Health', 'Los Angeles', 'CA', 'Day', 40, null, 49, 'Permanent', false, 3002, '• Active CA RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at UCLA Ronald Reagan Medical Center. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j143', 'seed', '0801d6f9-d297-572b-a635-fdd1f4da7980', 'Telemetry RN — Los Angeles', 'RN', 'Telemetry', 'Los Angeles', 'CA', 'Night', 36, 13, 91, 'Travel', false, 1649, '• 1+ yr telemetry
• BLS, ACLS required
• CA RN license (compact accepted)', '13-week travel contract at UCLA Ronald Reagan Medical Center. Housing + weekly stipend included.', 'open', now() - interval '15 days', now()),
  ('seed::j144', 'seed', '0801d6f9-d297-572b-a635-fdd1f4da7980', 'Neurology MD — Los Angeles', 'MD', 'Neurology', 'Los Angeles', 'CA', 'Day', 40, null, 328, 'Permanent', true, 47742, '• MD/DO with Neurology board cert
• CA license
• 3+ yrs preferred
• Visa support', 'Permanent position at UCLA Ronald Reagan Medical Center. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j145', 'seed', '0801d6f9-d297-572b-a635-fdd1f4da7980', 'Cath Lab RN — Los Angeles', 'RN', 'Cath Lab', 'Los Angeles', 'CA', 'Day', 40, 26, 103, 'Travel', false, 3318, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active CA RN license (compact)', '26-week travel contract at UCLA Ronald Reagan Medical Center. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j146', 'seed', '0801d6f9-d297-572b-a635-fdd1f4da7980', 'NICU RN — Los Angeles', 'RN', 'NICU', 'Los Angeles', 'CA', 'Night', 36, null, 95, 'Permanent', false, 3045, '• Active CA RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at UCLA Ronald Reagan Medical Center. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j147', 'seed', '0801d6f9-d297-572b-a635-fdd1f4da7980', 'ICU RN — Los Angeles', 'RN', 'ICU', 'Los Angeles', 'CA', 'Night', 36, 13, 105, 'Travel', false, 2448, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active CA RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at UCLA Ronald Reagan Medical Center. Housing + weekly stipend included.', 'open', now() - interval '6 days', now()),
  ('seed::j148', 'seed', 'e8cfde98-5568-50ca-bee2-90fa7afb191e', 'CRNA Permanent — San Francisco', 'CRNA', 'Anesthesiology', 'San Francisco', 'CA', 'Day', 40, null, 194, 'Permanent', false, 17184, '• Active CRNA cert
• CA license
• 3+ yrs experience
• Signing + relocation', 'Permanent position at UCSF Medical Center. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j149', 'seed', 'e8cfde98-5568-50ca-bee2-90fa7afb191e', 'Urgent Care PA — San Francisco', 'PA', 'Urgent Care', 'San Francisco', 'CA', 'Rotating', 36, null, 97, 'Permanent', false, 9351, '• PA-C with CA license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at UCSF Medical Center. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j150', 'seed', 'e8cfde98-5568-50ca-bee2-90fa7afb191e', 'ER RN — San Francisco', 'RN', 'ER', 'San Francisco', 'CA', 'Rotating', 36, 13, 96, 'Travel', false, 3445, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• CA RN license (compact)', '13-week travel contract at UCSF Medical Center. Housing + weekly stipend included.', 'open', now() - interval '15 days', now()),
  ('seed::j151', 'seed', 'e8cfde98-5568-50ca-bee2-90fa7afb191e', 'Hospitalist MD — San Francisco', 'MD', 'Hospitalist', 'San Francisco', 'CA', 'Day', 40, null, 309, 'Permanent', true, 43983, '• MD/DO with IM board cert
• Active CA license
• Active DEA
• Visa support available', 'Permanent position at UCSF Medical Center. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j152', 'seed', 'e8cfde98-5568-50ca-bee2-90fa7afb191e', 'Telemetry RN — San Francisco', 'RN', 'Telemetry', 'San Francisco', 'CA', 'Night', 36, 13, 86, 'Travel', false, 1825, '• 1+ yr telemetry
• BLS, ACLS required
• CA RN license (compact accepted)', '13-week travel contract at UCSF Medical Center. Housing + weekly stipend included.', 'open', now() - interval '16 days', now()),
  ('seed::j153', 'seed', 'e8cfde98-5568-50ca-bee2-90fa7afb191e', 'L&D RN — San Francisco', 'RN', 'Labor & Delivery', 'San Francisco', 'CA', 'Night', 36, 13, 110, 'Travel', false, 2530, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• CA RN license (compact accepted)', '13-week travel contract at UCSF Medical Center. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j154', 'seed', '74851574-4ded-5a6d-8801-f23a0a3e83eb', 'PACU RN — Palo Alto', 'RN', 'PACU', 'Palo Alto', 'CA', 'Day', 40, 13, 83, 'Travel', false, 2062, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• CA RN license
• Housing stipend', '13-week travel contract at Stanford Hospital. Housing + weekly stipend included.', 'open', now() - interval '15 days', now()),
  ('seed::j155', 'seed', '74851574-4ded-5a6d-8801-f23a0a3e83eb', 'Pediatric Hospitalist MD — Palo Alto', 'MD', 'Pediatric Hospitalist', 'Palo Alto', 'CA', 'Rotating', 40, null, 199, 'Permanent', true, 34362, '• MD/DO with Peds board cert
• CA license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at Stanford Hospital. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j156', 'seed', '74851574-4ded-5a6d-8801-f23a0a3e83eb', 'Radiology MD — Palo Alto', 'MD', 'Radiology', 'Palo Alto', 'CA', 'Day', 40, null, 369, 'Permanent', true, 72010, '• MD/DO with Radiology board cert
• CA license
• Body/musculoskeletal fellowship preferred
• Signing + visa', 'Permanent position at Stanford Hospital. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j157', 'seed', '74851574-4ded-5a6d-8801-f23a0a3e83eb', 'CRNA Permanent — Palo Alto', 'CRNA', 'Anesthesiology', 'Palo Alto', 'CA', 'Day', 40, null, 222, 'Permanent', false, 23849, '• Active CRNA cert
• CA license
• 3+ yrs experience
• Signing + relocation', 'Permanent position at Stanford Hospital. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j158', 'seed', '74851574-4ded-5a6d-8801-f23a0a3e83eb', 'CRNA — Palo Alto', 'CRNA', 'Anesthesiology', 'Palo Alto', 'CA', 'Day', 40, 13, 153, 'Travel', false, 3617, '• Active CRNA cert
• Active CA license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at Stanford Hospital. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j159', 'seed', '74851574-4ded-5a6d-8801-f23a0a3e83eb', 'Interventional Cardiology MD — Palo Alto', 'MD', 'Interventional Cardiology', 'Palo Alto', 'CA', 'Day', 45, null, 434, 'Permanent', true, 70014, '• MD/DO with Interventional Cardiology fellowship
• CA license
• Board cert
• Signing + visa support', 'Permanent position at Stanford Hospital. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j160', 'seed', '9a09b50d-0c44-56d4-9d44-801acce3dff2', 'Pediatric PA — Chicago', 'PA', 'Pediatrics', 'Chicago', 'IL', 'Day', 36, null, 81, 'Permanent', false, 4255, '• PA-C with active IL license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Northwestern Memorial Hospital. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j161', 'seed', '9a09b50d-0c44-56d4-9d44-801acce3dff2', 'Family Medicine NP — Chicago', 'NP', 'Family Medicine', 'Chicago', 'IL', 'Day', 36, null, 118, 'Permanent', false, 8190, '• Active IL NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at Northwestern Memorial Hospital. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j162', 'seed', '9a09b50d-0c44-56d4-9d44-801acce3dff2', 'Hospitalist MD — Chicago', 'MD', 'Hospitalist', 'Chicago', 'IL', 'Day', 40, null, 247, 'Permanent', true, 58073, '• MD/DO with IM board cert
• Active IL license
• Active DEA
• Visa support available', 'Permanent position at Northwestern Memorial Hospital. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j163', 'seed', '9a09b50d-0c44-56d4-9d44-801acce3dff2', 'Urgent Care PA — Chicago', 'PA', 'Urgent Care', 'Chicago', 'IL', 'Rotating', 36, null, 88, 'Permanent', false, 8907, '• PA-C with IL license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Northwestern Memorial Hospital. Full benefits, retirement matching.', 'open', now() - interval '1 days', now()),
  ('seed::j164', 'seed', 'e54263a8-1057-5b04-8732-ea667c6549c5', 'Home Health RN — Chicago', 'RN', 'Home Health', 'Chicago', 'IL', 'Day', 40, null, 61, 'Permanent', false, 4204, '• Active IL RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at University of Chicago Medicine. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j165', 'seed', 'e54263a8-1057-5b04-8732-ea667c6549c5', 'Pediatric Hospitalist MD — Chicago', 'MD', 'Pediatric Hospitalist', 'Chicago', 'IL', 'Rotating', 40, null, 233, 'Permanent', true, 32226, '• MD/DO with Peds board cert
• IL license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at University of Chicago Medicine. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j166', 'seed', 'e54263a8-1057-5b04-8732-ea667c6549c5', 'Emergency Medicine PA — Chicago', 'PA', 'Emergency Medicine', 'Chicago', 'IL', 'Rotating', 40, null, 86, 'Permanent', false, 9471, '• PA-C with IL license
• ER or urgent care experience
• 2+ yrs preferred
• Sign-on bonus', 'Permanent position at University of Chicago Medicine. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j167', 'seed', 'e54263a8-1057-5b04-8732-ea667c6549c5', 'General Surgery MD — Chicago', 'MD', 'General Surgery', 'Chicago', 'IL', 'Day', 45, null, 367, 'Permanent', true, 41902, '• MD/DO with General Surgery board cert
• IL license
• 3+ yrs
• Signing + visa', 'Permanent position at University of Chicago Medicine. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j168', 'seed', 'e54263a8-1057-5b04-8732-ea667c6549c5', 'Orthopedic Surgery MD — Chicago', 'MD', 'Orthopedic Surgery', 'Chicago', 'IL', 'Day', 45, null, 471, 'Permanent', true, 103835, '• MD/DO with Ortho board cert
• IL license
• Fellowship preferred
• Signing + visa', 'Permanent position at University of Chicago Medicine. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j169', 'seed', 'bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'OR RN — Chicago', 'RN', 'OR', 'Chicago', 'IL', 'Day', 40, 8, 74, 'Travel', false, 2928, '• 1+ yr OR (orthopedics a plus)
• IL RN license
• CNOR preferred
• Completion bonus', '8-week travel contract at Rush University Medical Center. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j170', 'seed', 'bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'Psychiatry MD — Chicago', 'MD', 'Psychiatry', 'Chicago', 'IL', 'Day', 40, null, 248, 'Permanent', true, 32750, '• MD/DO with Psychiatry board cert
• IL license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at Rush University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j171', 'seed', 'bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'Urgent Care PA — Chicago', 'PA', 'Urgent Care', 'Chicago', 'IL', 'Rotating', 36, null, 80, 'Permanent', false, 8782, '• PA-C with IL license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Rush University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '6 days', now()),
  ('seed::j172', 'seed', 'bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'NICU RN — Chicago', 'RN', 'NICU', 'Chicago', 'IL', 'Night', 36, null, 89, 'Permanent', false, 5131, '• Active IL RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Rush University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j173', 'seed', 'bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'Cardiology MD — Chicago', 'MD', 'Cardiology', 'Chicago', 'IL', 'Day', 40, null, 326, 'Permanent', true, 53871, '• MD/DO with Cardiology board cert
• IL license
• 3+ yrs post-fellowship
• Visa sponsorship', 'Permanent position at Rush University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j174', 'seed', 'bc2c6e0b-a1c4-56ad-bd49-a7f37f5ba81d', 'Hospitalist MD — Chicago', 'MD', 'Hospitalist', 'Chicago', 'IL', 'Day', 40, null, 286, 'Permanent', true, 41059, '• MD/DO with IM board cert
• Active IL license
• Active DEA
• Visa support available', 'Permanent position at Rush University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j175', 'seed', 'db69dd97-40e5-5349-a892-0ec306eca6af', 'Pediatric Hospitalist MD — Philadelphia', 'MD', 'Pediatric Hospitalist', 'Philadelphia', 'PA', 'Rotating', 40, null, 200, 'Permanent', true, 40411, '• MD/DO with Peds board cert
• PA license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at Penn Presbyterian Medical Center. Full benefits, retirement matching.', 'open', now() - interval '1 days', now()),
  ('seed::j176', 'seed', 'db69dd97-40e5-5349-a892-0ec306eca6af', 'LVN/LPN — Philadelphia', 'LPN', 'SNF / Long-Term Care', 'Philadelphia', 'PA', 'Night', 36, null, 33, 'Permanent', false, 1716, '• Active PA LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Penn Presbyterian Medical Center. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j177', 'seed', 'db69dd97-40e5-5349-a892-0ec306eca6af', 'Psychiatry MD — Philadelphia', 'MD', 'Psychiatry', 'Philadelphia', 'PA', 'Day', 40, null, 253, 'Permanent', true, 55599, '• MD/DO with Psychiatry board cert
• PA license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at Penn Presbyterian Medical Center. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j178', 'seed', 'db69dd97-40e5-5349-a892-0ec306eca6af', 'Pediatric PA — Philadelphia', 'PA', 'Pediatrics', 'Philadelphia', 'PA', 'Day', 36, null, 92, 'Permanent', false, 4127, '• PA-C with active PA license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Penn Presbyterian Medical Center. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j179', 'seed', 'db69dd97-40e5-5349-a892-0ec306eca6af', 'PACU RN — Philadelphia', 'RN', 'PACU', 'Philadelphia', 'PA', 'Day', 40, 13, 82, 'Travel', false, 3218, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• PA RN license
• Housing stipend', '13-week travel contract at Penn Presbyterian Medical Center. Housing + weekly stipend included.', 'open', now() - interval '1 days', now()),
  ('seed::j180', 'seed', '366f3ada-573e-51b7-8c6f-987857e9665a', 'NICU RN — Durham', 'RN', 'NICU', 'Durham', 'NC', 'Night', 36, null, 99, 'Permanent', false, 6809, '• Active NC RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Duke University Hospital. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j181', 'seed', '366f3ada-573e-51b7-8c6f-987857e9665a', 'Telemetry RN — Durham', 'RN', 'Telemetry', 'Durham', 'NC', 'Night', 36, 13, 96, 'Travel', false, 2255, '• 1+ yr telemetry
• BLS, ACLS required
• NC RN license (compact accepted)', '13-week travel contract at Duke University Hospital. Housing + weekly stipend included.', 'open', now() - interval '6 days', now()),
  ('seed::j182', 'seed', '366f3ada-573e-51b7-8c6f-987857e9665a', 'LVN/LPN — Durham', 'LPN', 'SNF / Long-Term Care', 'Durham', 'NC', 'Night', 36, null, 35, 'Permanent', false, 1335, '• Active NC LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Duke University Hospital. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j183', 'seed', '366f3ada-573e-51b7-8c6f-987857e9665a', 'CRNA — Durham', 'CRNA', 'Anesthesiology', 'Durham', 'NC', 'Day', 40, 13, 151, 'Travel', false, 5370, '• Active CRNA cert
• Active NC license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at Duke University Hospital. Housing + weekly stipend included.', 'open', now() - interval '1 days', now()),
  ('seed::j184', 'seed', '366f3ada-573e-51b7-8c6f-987857e9665a', 'Emergency Medicine MD — Durham', 'MD', 'Emergency Medicine', 'Durham', 'NC', 'Rotating', 36, null, 324, 'Permanent', true, 64596, '• MD/DO with EM board cert
• NC license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Duke University Hospital. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j185', 'seed', '366f3ada-573e-51b7-8c6f-987857e9665a', 'L&D RN — Durham', 'RN', 'Labor & Delivery', 'Durham', 'NC', 'Night', 36, 13, 94, 'Travel', false, 2155, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• NC RN license (compact accepted)', '13-week travel contract at Duke University Hospital. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j186', 'seed', 'dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'Psychiatry MD — Chapel Hill', 'MD', 'Psychiatry', 'Chapel Hill', 'NC', 'Day', 40, null, 283, 'Permanent', true, 57862, '• MD/DO with Psychiatry board cert
• NC license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at UNC Medical Center. Full benefits, retirement matching.', 'open', now() - interval '20 days', now()),
  ('seed::j187', 'seed', 'dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'Interventional Cardiology MD — Chapel Hill', 'MD', 'Interventional Cardiology', 'Chapel Hill', 'NC', 'Day', 45, null, 488, 'Permanent', true, 67933, '• MD/DO with Interventional Cardiology fellowship
• NC license
• Board cert
• Signing + visa support', 'Permanent position at UNC Medical Center. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j188', 'seed', 'dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'Telemetry RN — Chapel Hill', 'RN', 'Telemetry', 'Chapel Hill', 'NC', 'Night', 36, 13, 73, 'Travel', false, 2211, '• 1+ yr telemetry
• BLS, ACLS required
• NC RN license (compact accepted)', '13-week travel contract at UNC Medical Center. Housing + weekly stipend included.', 'open', now() - interval '18 days', now()),
  ('seed::j189', 'seed', 'dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'L&D RN — Chapel Hill', 'RN', 'Labor & Delivery', 'Chapel Hill', 'NC', 'Night', 36, 13, 109, 'Travel', false, 3354, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• NC RN license (compact accepted)', '13-week travel contract at UNC Medical Center. Housing + weekly stipend included.', 'open', now() - interval '12 days', now()),
  ('seed::j190', 'seed', 'dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'Family Medicine MD — Chapel Hill', 'MD', 'Family Medicine', 'Chapel Hill', 'NC', 'Day', 40, null, 219, 'Permanent', true, 41579, '• MD/DO with FM board cert
• NC license
• 3+ yrs preferred
• Visa support available', 'Permanent position at UNC Medical Center. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j191', 'seed', 'dcdedf7f-9a0d-5658-b3d3-2d79fcbc5e79', 'Pediatric Hospitalist MD — Chapel Hill', 'MD', 'Pediatric Hospitalist', 'Chapel Hill', 'NC', 'Rotating', 40, null, 195, 'Permanent', true, 38764, '• MD/DO with Peds board cert
• NC license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at UNC Medical Center. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j192', 'seed', '7b053ac6-63e1-5baf-988d-4f5b41f08a5e', 'Pediatric PA — Nashville', 'PA', 'Pediatrics', 'Nashville', 'TN', 'Day', 36, null, 82, 'Permanent', false, 6897, '• PA-C with active TN license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Vanderbilt University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '5 days', now()),
  ('seed::j193', 'seed', '7b053ac6-63e1-5baf-988d-4f5b41f08a5e', 'LVN/LPN — Nashville', 'LPN', 'SNF / Long-Term Care', 'Nashville', 'TN', 'Night', 36, null, 45, 'Permanent', false, 1360, '• Active TN LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Vanderbilt University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j194', 'seed', '7b053ac6-63e1-5baf-988d-4f5b41f08a5e', 'Family Medicine NP Locum — Nashville', 'NP', 'Family Medicine', 'Nashville', 'TN', 'Day', 36, 26, 118, 'Locums', false, 0, '• Active TN NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at Vanderbilt University Medical Center. Malpractice covered, travel included.', 'open', now() - interval '9 days', now()),
  ('seed::j195', 'seed', '7b053ac6-63e1-5baf-988d-4f5b41f08a5e', 'Interventional Cardiology MD — Nashville', 'MD', 'Interventional Cardiology', 'Nashville', 'TN', 'Day', 45, null, 463, 'Permanent', true, 95269, '• MD/DO with Interventional Cardiology fellowship
• TN license
• Board cert
• Signing + visa support', 'Permanent position at Vanderbilt University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j196', 'seed', '6f2bce17-d4ab-50ae-b88a-e350490410ba', 'Pediatric PA — Atlanta', 'PA', 'Pediatrics', 'Atlanta', 'GA', 'Day', 36, null, 78, 'Permanent', false, 7488, '• PA-C with active GA license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Emory University Hospital. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j197', 'seed', '6f2bce17-d4ab-50ae-b88a-e350490410ba', 'Psychiatry MD — Atlanta', 'MD', 'Psychiatry', 'Atlanta', 'GA', 'Day', 40, null, 256, 'Permanent', true, 39139, '• MD/DO with Psychiatry board cert
• GA license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at Emory University Hospital. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j198', 'seed', '6f2bce17-d4ab-50ae-b88a-e350490410ba', 'Internal Medicine MD — Atlanta', 'MD', 'Internal Medicine', 'Atlanta', 'GA', 'Day', 40, null, 240, 'Permanent', true, 49591, '• MD/DO with IM board cert
• GA license
• Active DEA
• Visa sponsorship', 'Permanent position at Emory University Hospital. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j199', 'seed', '6f2bce17-d4ab-50ae-b88a-e350490410ba', 'Hospitalist MD Locum — Atlanta', 'MD', 'Hospitalist', 'Atlanta', 'GA', 'Day', 36, 4, 261, 'Locums', false, 0, '• Active GA MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at Emory University Hospital. Malpractice covered, travel included.', 'open', now() - interval '20 days', now()),
  ('seed::j200', 'seed', '6f2bce17-d4ab-50ae-b88a-e350490410ba', 'PACU RN — Atlanta', 'RN', 'PACU', 'Atlanta', 'GA', 'Day', 40, 13, 97, 'Travel', false, 2276, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• GA RN license
• Housing stipend', '13-week travel contract at Emory University Hospital. Housing + weekly stipend included.', 'open', now() - interval '11 days', now()),
  ('seed::j201', 'seed', 'b0071835-45d5-5fde-9319-786dd3777e39', 'CRNA — Houston', 'CRNA', 'Anesthesiology', 'Houston', 'TX', 'Day', 40, 13, 176, 'Travel', false, 3868, '• Active CRNA cert
• Active TX license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at Memorial Hermann-Texas Medical Center. Housing + weekly stipend included.', 'open', now() - interval '12 days', now()),
  ('seed::j202', 'seed', 'b0071835-45d5-5fde-9319-786dd3777e39', 'General Surgery MD — Houston', 'MD', 'General Surgery', 'Houston', 'TX', 'Day', 45, null, 407, 'Permanent', true, 56931, '• MD/DO with General Surgery board cert
• TX license
• 3+ yrs
• Signing + visa', 'Permanent position at Memorial Hermann-Texas Medical Center. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j203', 'seed', 'b0071835-45d5-5fde-9319-786dd3777e39', 'Family Medicine NP — Houston', 'NP', 'Family Medicine', 'Houston', 'TX', 'Day', 36, null, 109, 'Permanent', false, 9883, '• Active TX NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at Memorial Hermann-Texas Medical Center. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j204', 'seed', 'b0071835-45d5-5fde-9319-786dd3777e39', 'OR RN — Houston', 'RN', 'OR', 'Houston', 'TX', 'Day', 40, 8, 91, 'Travel', false, 2010, '• 1+ yr OR (orthopedics a plus)
• TX RN license
• CNOR preferred
• Completion bonus', '8-week travel contract at Memorial Hermann-Texas Medical Center. Housing + weekly stipend included.', 'open', now() - interval '17 days', now()),
  ('seed::j205', 'seed', '93c3c5fe-3b8c-5ad2-b5d0-22e85d33f72e', 'Med-Surg RN — Dallas', 'RN', 'Med-Surg', 'Dallas', 'TX', 'Day', 36, 13, 79, 'Travel', false, 2137, '• 1+ yr Med-Surg
• BLS required
• TX RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at Baylor University Medical Center. Housing + weekly stipend included.', 'open', now() - interval '8 days', now()),
  ('seed::j206', 'seed', '93c3c5fe-3b8c-5ad2-b5d0-22e85d33f72e', 'Telemetry RN — Dallas', 'RN', 'Telemetry', 'Dallas', 'TX', 'Night', 36, 13, 94, 'Travel', false, 2475, '• 1+ yr telemetry
• BLS, ACLS required
• TX RN license (compact accepted)', '13-week travel contract at Baylor University Medical Center. Housing + weekly stipend included.', 'open', now() - interval '16 days', now()),
  ('seed::j207', 'seed', '93c3c5fe-3b8c-5ad2-b5d0-22e85d33f72e', 'Internal Medicine MD — Dallas', 'MD', 'Internal Medicine', 'Dallas', 'TX', 'Day', 40, null, 253, 'Permanent', true, 50982, '• MD/DO with IM board cert
• TX license
• Active DEA
• Visa sponsorship', 'Permanent position at Baylor University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '1 days', now()),
  ('seed::j208', 'seed', '93c3c5fe-3b8c-5ad2-b5d0-22e85d33f72e', 'Pediatric PA — Dallas', 'PA', 'Pediatrics', 'Dallas', 'TX', 'Day', 36, null, 70, 'Permanent', false, 5205, '• PA-C with active TX license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Baylor University Medical Center. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j209', 'seed', '3ff19ca3-b43d-51ac-b125-e3d92a3206b5', 'Family Medicine MD — Dallas', 'MD', 'Family Medicine', 'Dallas', 'TX', 'Day', 40, null, 238, 'Permanent', true, 40507, '• MD/DO with FM board cert
• TX license
• 3+ yrs preferred
• Visa support available', 'Permanent position at UT Southwestern Medical Center. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j210', 'seed', '3ff19ca3-b43d-51ac-b125-e3d92a3206b5', 'Telemetry RN — Dallas', 'RN', 'Telemetry', 'Dallas', 'TX', 'Night', 36, 13, 88, 'Travel', false, 2204, '• 1+ yr telemetry
• BLS, ACLS required
• TX RN license (compact accepted)', '13-week travel contract at UT Southwestern Medical Center. Housing + weekly stipend included.', 'open', now() - interval '14 days', now()),
  ('seed::j211', 'seed', '3ff19ca3-b43d-51ac-b125-e3d92a3206b5', 'Home Health RN — Dallas', 'RN', 'Home Health', 'Dallas', 'TX', 'Day', 40, null, 71, 'Permanent', false, 4254, '• Active TX RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at UT Southwestern Medical Center. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j212', 'seed', '3ff19ca3-b43d-51ac-b125-e3d92a3206b5', 'Emergency Medicine MD — Dallas', 'MD', 'Emergency Medicine', 'Dallas', 'TX', 'Rotating', 36, null, 330, 'Permanent', true, 69736, '• MD/DO with EM board cert
• TX license
• 3+ yrs post-residency
• Visa support', 'Permanent position at UT Southwestern Medical Center. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j213', 'seed', '3ff19ca3-b43d-51ac-b125-e3d92a3206b5', 'Hospitalist MD Locum — Dallas', 'MD', 'Hospitalist', 'Dallas', 'TX', 'Day', 36, 4, 244, 'Locums', false, 0, '• Active TX MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at UT Southwestern Medical Center. Malpractice covered, travel included.', 'open', now() - interval '9 days', now()),
  ('seed::j214', 'seed', '0e5a31cb-6b44-5ae1-a9a9-4cd088bade40', 'L&D RN — Houston', 'RN', 'Labor & Delivery', 'Houston', 'TX', 'Night', 36, 13, 89, 'Travel', false, 3521, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• TX RN license (compact accepted)', '13-week travel contract at MD Anderson Cancer Center. Housing + weekly stipend included.', 'open', now() - interval '18 days', now()),
  ('seed::j215', 'seed', '0e5a31cb-6b44-5ae1-a9a9-4cd088bade40', 'Internal Medicine MD — Houston', 'MD', 'Internal Medicine', 'Houston', 'TX', 'Day', 40, null, 285, 'Permanent', true, 49975, '• MD/DO with IM board cert
• TX license
• Active DEA
• Visa sponsorship', 'Permanent position at MD Anderson Cancer Center. Full benefits, retirement matching.', 'open', now() - interval '6 days', now()),
  ('seed::j216', 'seed', '0e5a31cb-6b44-5ae1-a9a9-4cd088bade40', 'Cath Lab RN — Houston', 'RN', 'Cath Lab', 'Houston', 'TX', 'Day', 40, 26, 94, 'Travel', false, 2943, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active TX RN license (compact)', '26-week travel contract at MD Anderson Cancer Center. Housing + weekly stipend included.', 'open', now() - interval '16 days', now()),
  ('seed::j217', 'seed', '0e5a31cb-6b44-5ae1-a9a9-4cd088bade40', 'Family Medicine NP — Houston', 'NP', 'Family Medicine', 'Houston', 'TX', 'Day', 36, null, 109, 'Permanent', false, 10935, '• Active TX NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at MD Anderson Cancer Center. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j218', 'seed', 'c80a5927-f41d-5470-be02-7d4dafef29d3', 'Cardiology MD — Houston', 'MD', 'Cardiology', 'Houston', 'TX', 'Day', 40, null, 314, 'Permanent', true, 63650, '• MD/DO with Cardiology board cert
• TX license
• 3+ yrs post-fellowship
• Visa sponsorship', 'Permanent position at Houston Methodist Hospital. Full benefits, retirement matching.', 'open', now() - interval '6 days', now()),
  ('seed::j219', 'seed', 'c80a5927-f41d-5470-be02-7d4dafef29d3', 'Home Health RN — Houston', 'RN', 'Home Health', 'Houston', 'TX', 'Day', 40, null, 57, 'Permanent', false, 2057, '• Active TX RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at Houston Methodist Hospital. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j220', 'seed', 'c80a5927-f41d-5470-be02-7d4dafef29d3', 'L&D RN — Houston', 'RN', 'Labor & Delivery', 'Houston', 'TX', 'Night', 36, 13, 90, 'Travel', false, 2561, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• TX RN license (compact accepted)', '13-week travel contract at Houston Methodist Hospital. Housing + weekly stipend included.', 'open', now() - interval '2 days', now()),
  ('seed::j221', 'seed', 'c80a5927-f41d-5470-be02-7d4dafef29d3', 'Psychiatry MD — Houston', 'MD', 'Psychiatry', 'Houston', 'TX', 'Day', 40, null, 251, 'Permanent', true, 48132, '• MD/DO with Psychiatry board cert
• TX license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at Houston Methodist Hospital. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j222', 'seed', 'c80a5927-f41d-5470-be02-7d4dafef29d3', 'Cath Lab RN — Houston', 'RN', 'Cath Lab', 'Houston', 'TX', 'Day', 40, 26, 110, 'Travel', false, 4433, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active TX RN license (compact)', '26-week travel contract at Houston Methodist Hospital. Housing + weekly stipend included.', 'open', now() - interval '5 days', now()),
  ('seed::j223', 'seed', 'c80a5927-f41d-5470-be02-7d4dafef29d3', 'Radiology MD — Houston', 'MD', 'Radiology', 'Houston', 'TX', 'Day', 40, null, 416, 'Permanent', true, 82170, '• MD/DO with Radiology board cert
• TX license
• Body/musculoskeletal fellowship preferred
• Signing + visa', 'Permanent position at Houston Methodist Hospital. Full benefits, retirement matching.', 'open', now() - interval '4 days', now()),
  ('seed::j224', 'seed', 'b7bd43d4-020a-5a00-bd50-bf8ce414e82f', 'Hospitalist MD Locum — Dallas', 'MD', 'Hospitalist', 'Dallas', 'TX', 'Day', 36, 4, 246, 'Locums', false, 0, '• Active TX MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at Texas Health Presbyterian. Malpractice covered, travel included.', 'open', now() - interval '6 days', now()),
  ('seed::j225', 'seed', 'b7bd43d4-020a-5a00-bd50-bf8ce414e82f', 'Home Health RN — Dallas', 'RN', 'Home Health', 'Dallas', 'TX', 'Day', 40, null, 49, 'Permanent', false, 3034, '• Active TX RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at Texas Health Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j226', 'seed', 'b7bd43d4-020a-5a00-bd50-bf8ce414e82f', 'CRNA — Dallas', 'CRNA', 'Anesthesiology', 'Dallas', 'TX', 'Day', 40, 13, 152, 'Travel', false, 3267, '• Active CRNA cert
• Active TX license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at Texas Health Presbyterian. Housing + weekly stipend included.', 'open', now() - interval '13 days', now()),
  ('seed::j227', 'seed', 'b7bd43d4-020a-5a00-bd50-bf8ce414e82f', 'Urgent Care PA — Dallas', 'PA', 'Urgent Care', 'Dallas', 'TX', 'Rotating', 36, null, 91, 'Permanent', false, 5606, '• PA-C with TX license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Texas Health Presbyterian. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j228', 'seed', 'd672a15b-98f1-57cb-b954-3e9608604076', 'Emergency Medicine MD — Oakland', 'MD', 'Emergency Medicine', 'Oakland', 'CA', 'Rotating', 36, null, 323, 'Permanent', true, 45582, '• MD/DO with EM board cert
• CA license
• 3+ yrs post-residency
• Visa support', 'Permanent position at Kaiser Permanente Oakland. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j229', 'seed', 'd672a15b-98f1-57cb-b954-3e9608604076', 'ER RN — Oakland', 'RN', 'ER', 'Oakland', 'CA', 'Rotating', 36, 13, 83, 'Travel', false, 2642, '• 2+ yrs ER experience
• BLS, ACLS, PALS required
• Trauma cert preferred
• CA RN license (compact)', '13-week travel contract at Kaiser Permanente Oakland. Housing + weekly stipend included.', 'open', now() - interval '14 days', now()),
  ('seed::j230', 'seed', 'd672a15b-98f1-57cb-b954-3e9608604076', 'NICU RN — Oakland', 'RN', 'NICU', 'Oakland', 'CA', 'Night', 36, null, 100, 'Permanent', false, 7280, '• Active CA RN license (or compact)
• BLS, NRP required
• STABLE cert preferred
• 1+ yr NICU experience', 'Permanent position at Kaiser Permanente Oakland. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j231', 'seed', 'd672a15b-98f1-57cb-b954-3e9608604076', 'Orthopedic Surgery MD — Oakland', 'MD', 'Orthopedic Surgery', 'Oakland', 'CA', 'Day', 45, null, 500, 'Permanent', true, 119539, '• MD/DO with Ortho board cert
• CA license
• Fellowship preferred
• Signing + visa', 'Permanent position at Kaiser Permanente Oakland. Full benefits, retirement matching.', 'open', now() - interval '15 days', now()),
  ('seed::j232', 'seed', 'd672a15b-98f1-57cb-b954-3e9608604076', 'Neurology MD — Oakland', 'MD', 'Neurology', 'Oakland', 'CA', 'Day', 40, null, 313, 'Permanent', true, 63103, '• MD/DO with Neurology board cert
• CA license
• 3+ yrs preferred
• Visa support', 'Permanent position at Kaiser Permanente Oakland. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j233', 'seed', 'd672a15b-98f1-57cb-b954-3e9608604076', 'Hospitalist MD Locum — Oakland', 'MD', 'Hospitalist', 'Oakland', 'CA', 'Day', 36, 4, 261, 'Locums', false, 0, '• Active CA MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at Kaiser Permanente Oakland. Malpractice covered, travel included.', 'open', now() - interval '20 days', now()),
  ('seed::j234', 'seed', 'e0270cc4-aad0-5a75-aab1-174cb0dfde32', 'Cardiology MD — Los Angeles', 'MD', 'Cardiology', 'Los Angeles', 'CA', 'Day', 40, null, 382, 'Permanent', true, 53617, '• MD/DO with Cardiology board cert
• CA license
• 3+ yrs post-fellowship
• Visa sponsorship', 'Permanent position at Kaiser Permanente Los Angeles. Full benefits, retirement matching.', 'open', now() - interval '7 days', now()),
  ('seed::j235', 'seed', 'e0270cc4-aad0-5a75-aab1-174cb0dfde32', 'LVN/LPN — Los Angeles', 'LPN', 'SNF / Long-Term Care', 'Los Angeles', 'CA', 'Night', 36, null, 40, 'Permanent', false, 2352, '• Active CA LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Kaiser Permanente Los Angeles. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j236', 'seed', 'e0270cc4-aad0-5a75-aab1-174cb0dfde32', 'Internal Medicine MD — Los Angeles', 'MD', 'Internal Medicine', 'Los Angeles', 'CA', 'Day', 40, null, 235, 'Permanent', true, 32859, '• MD/DO with IM board cert
• CA license
• Active DEA
• Visa sponsorship', 'Permanent position at Kaiser Permanente Los Angeles. Full benefits, retirement matching.', 'open', now() - interval '6 days', now()),
  ('seed::j237', 'seed', 'e0270cc4-aad0-5a75-aab1-174cb0dfde32', 'L&D RN — Los Angeles', 'RN', 'Labor & Delivery', 'Los Angeles', 'CA', 'Night', 36, 13, 117, 'Travel', false, 2153, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• CA RN license (compact accepted)', '13-week travel contract at Kaiser Permanente Los Angeles. Housing + weekly stipend included.', 'open', now() - interval '6 days', now()),
  ('seed::j238', 'seed', '0c09912d-69bc-57b5-92a7-8d062fbe7b64', 'Pediatric PA — Denver', 'PA', 'Pediatrics', 'Denver', 'CO', 'Day', 36, null, 83, 'Permanent', false, 5192, '• PA-C with active CO license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Kaiser Permanente Denver. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j239', 'seed', '0c09912d-69bc-57b5-92a7-8d062fbe7b64', 'Urgent Care PA — Denver', 'PA', 'Urgent Care', 'Denver', 'CO', 'Rotating', 36, null, 83, 'Permanent', false, 7360, '• PA-C with CO license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Kaiser Permanente Denver. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j240', 'seed', '0c09912d-69bc-57b5-92a7-8d062fbe7b64', 'Family Medicine MD — Denver', 'MD', 'Family Medicine', 'Denver', 'CO', 'Day', 40, null, 259, 'Permanent', true, 39877, '• MD/DO with FM board cert
• CO license
• 3+ yrs preferred
• Visa support available', 'Permanent position at Kaiser Permanente Denver. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j241', 'seed', '0c09912d-69bc-57b5-92a7-8d062fbe7b64', 'Cardiology MD — Denver', 'MD', 'Cardiology', 'Denver', 'CO', 'Day', 40, null, 372, 'Permanent', true, 55297, '• MD/DO with Cardiology board cert
• CO license
• 3+ yrs post-fellowship
• Visa sponsorship', 'Permanent position at Kaiser Permanente Denver. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j242', 'seed', 'fd36b50f-c949-5e01-9892-21aac9878930', 'Hospitalist MD Locum — Dallas', 'MD', 'Hospitalist', 'Dallas', 'TX', 'Day', 36, 4, 259, 'Locums', false, 0, '• Active TX MD license
• Active DEA
• Board-cert IM
• Malpractice covered', '4-week locum at VA North Texas Health Care System. Malpractice covered, travel included.', 'open', now() - interval '8 days', now()),
  ('seed::j243', 'seed', 'fd36b50f-c949-5e01-9892-21aac9878930', 'Emergency Medicine MD — Dallas', 'MD', 'Emergency Medicine', 'Dallas', 'TX', 'Rotating', 36, null, 367, 'Permanent', true, 49764, '• MD/DO with EM board cert
• TX license
• 3+ yrs post-residency
• Visa support', 'Permanent position at VA North Texas Health Care System. Full benefits, retirement matching.', 'open', now() - interval '9 days', now()),
  ('seed::j244', 'seed', 'fd36b50f-c949-5e01-9892-21aac9878930', 'Neurology MD — Dallas', 'MD', 'Neurology', 'Dallas', 'TX', 'Day', 40, null, 293, 'Permanent', true, 39679, '• MD/DO with Neurology board cert
• TX license
• 3+ yrs preferred
• Visa support', 'Permanent position at VA North Texas Health Care System. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j245', 'seed', 'fd36b50f-c949-5e01-9892-21aac9878930', 'Cath Lab RN — Dallas', 'RN', 'Cath Lab', 'Dallas', 'TX', 'Day', 40, 26, 93, 'Travel', false, 4123, '• 2+ yrs Cath Lab
• BLS, ACLS, RCIS preferred
• Active TX RN license (compact)', '26-week travel contract at VA North Texas Health Care System. Housing + weekly stipend included.', 'open', now() - interval '10 days', now()),
  ('seed::j246', 'seed', 'fd36b50f-c949-5e01-9892-21aac9878930', 'Pediatric PA — Dallas', 'PA', 'Pediatrics', 'Dallas', 'TX', 'Day', 36, null, 87, 'Permanent', false, 7067, '• PA-C with active TX license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at VA North Texas Health Care System. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j247', 'seed', 'fd36b50f-c949-5e01-9892-21aac9878930', 'L&D RN — Dallas', 'RN', 'Labor & Delivery', 'Dallas', 'TX', 'Night', 36, 13, 100, 'Travel', false, 2899, '• 2+ yrs L&D
• BLS, NRP, AWHONN Intermediate FHM required
• TX RN license (compact accepted)', '13-week travel contract at VA North Texas Health Care System. Housing + weekly stipend included.', 'open', now() - interval '4 days', now()),
  ('seed::j248', 'seed', '9afb9f17-4318-5456-ba09-7be0680e2300', 'Family Medicine MD — Palo Alto', 'MD', 'Family Medicine', 'Palo Alto', 'CA', 'Day', 40, null, 247, 'Permanent', true, 42694, '• MD/DO with FM board cert
• CA license
• 3+ yrs preferred
• Visa support available', 'Permanent position at VA Palo Alto Health Care System. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j249', 'seed', '9afb9f17-4318-5456-ba09-7be0680e2300', 'Home Health RN — Palo Alto', 'RN', 'Home Health', 'Palo Alto', 'CA', 'Day', 40, null, 62, 'Permanent', false, 2329, '• Active CA RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position at VA Palo Alto Health Care System. Full benefits, retirement matching.', 'open', now() - interval '20 days', now()),
  ('seed::j250', 'seed', '9afb9f17-4318-5456-ba09-7be0680e2300', 'Emergency Medicine PA — Palo Alto', 'PA', 'Emergency Medicine', 'Palo Alto', 'CA', 'Rotating', 40, null, 74, 'Permanent', false, 12078, '• PA-C with CA license
• ER or urgent care experience
• 2+ yrs preferred
• Sign-on bonus', 'Permanent position at VA Palo Alto Health Care System. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j251', 'seed', '9afb9f17-4318-5456-ba09-7be0680e2300', 'LVN/LPN — Palo Alto', 'LPN', 'SNF / Long-Term Care', 'Palo Alto', 'CA', 'Night', 36, null, 40, 'Permanent', false, 1052, '• Active CA LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at VA Palo Alto Health Care System. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j252', 'seed', '9afb9f17-4318-5456-ba09-7be0680e2300', 'PACU RN — Palo Alto', 'RN', 'PACU', 'Palo Alto', 'CA', 'Day', 40, 13, 83, 'Travel', false, 3469, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• CA RN license
• Housing stipend', '13-week travel contract at VA Palo Alto Health Care System. Housing + weekly stipend included.', 'open', now() - interval '19 days', now()),
  ('seed::j253', 'seed', 'ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'LVN/LPN — Seattle', 'LPN', 'SNF / Long-Term Care', 'Seattle', 'WA', 'Night', 36, null, 33, 'Permanent', false, 1358, '• Active WA LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at VA Puget Sound Health Care System. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j254', 'seed', 'ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'ICU RN — Seattle', 'RN', 'ICU', 'Seattle', 'WA', 'Night', 36, 13, 111, 'Travel', false, 3334, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active WA RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at VA Puget Sound Health Care System. Housing + weekly stipend included.', 'open', now() - interval '15 days', now()),
  ('seed::j255', 'seed', 'ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'Pediatric Hospitalist MD — Seattle', 'MD', 'Pediatric Hospitalist', 'Seattle', 'WA', 'Rotating', 40, null, 212, 'Permanent', true, 30947, '• MD/DO with Peds board cert
• WA license
• 2+ yrs inpatient peds
• Visa support', 'Permanent position at VA Puget Sound Health Care System. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j256', 'seed', 'ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'Emergency Medicine MD — Seattle', 'MD', 'Emergency Medicine', 'Seattle', 'WA', 'Rotating', 36, null, 340, 'Permanent', true, 72225, '• MD/DO with EM board cert
• WA license
• 3+ yrs post-residency
• Visa support', 'Permanent position at VA Puget Sound Health Care System. Full benefits, retirement matching.', 'open', now() - interval '3 days', now()),
  ('seed::j257', 'seed', 'ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'Psychiatry MD — Seattle', 'MD', 'Psychiatry', 'Seattle', 'WA', 'Day', 40, null, 305, 'Permanent', true, 41401, '• MD/DO with Psychiatry board cert
• WA license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at VA Puget Sound Health Care System. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j258', 'seed', 'ae4cf998-3e74-5425-bb1c-309e8e0831ca', 'PACU RN — Seattle', 'RN', 'PACU', 'Seattle', 'WA', 'Day', 40, 13, 86, 'Travel', false, 2157, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• WA RN license
• Housing stipend', '13-week travel contract at VA Puget Sound Health Care System. Housing + weekly stipend included.', 'open', now() - interval '4 days', now()),
  ('seed::j259', 'seed', '72f9939e-c3aa-5407-a10c-2d370d1e131f', 'Family Medicine NP — New York', 'NP', 'Family Medicine', 'New York', 'NY', 'Day', 36, null, 110, 'Permanent', false, 10427, '• Active NY NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position at VA New York Harbor Healthcare. Full benefits, retirement matching.', 'open', now() - interval '13 days', now()),
  ('seed::j260', 'seed', '72f9939e-c3aa-5407-a10c-2d370d1e131f', 'Pediatric PA — New York', 'PA', 'Pediatrics', 'New York', 'NY', 'Day', 36, null, 92, 'Permanent', false, 6253, '• PA-C with active NY license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at VA New York Harbor Healthcare. Full benefits, retirement matching.', 'open', now() - interval '2 days', now()),
  ('seed::j261', 'seed', '72f9939e-c3aa-5407-a10c-2d370d1e131f', 'Family Medicine MD — New York', 'MD', 'Family Medicine', 'New York', 'NY', 'Day', 40, null, 244, 'Permanent', true, 27885, '• MD/DO with FM board cert
• NY license
• 3+ yrs preferred
• Visa support available', 'Permanent position at VA New York Harbor Healthcare. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j262', 'seed', '72f9939e-c3aa-5407-a10c-2d370d1e131f', 'CRNA — New York', 'CRNA', 'Anesthesiology', 'New York', 'NY', 'Day', 40, 13, 161, 'Travel', false, 4324, '• Active CRNA cert
• Active NY license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at VA New York Harbor Healthcare. Housing + weekly stipend included.', 'open', now() - interval '4 days', now()),
  ('seed::j263', 'seed', 'dde04cdc-a5f7-5294-b849-eef5a5f39ae0', 'General Surgery MD — Chicago', 'MD', 'General Surgery', 'Chicago', 'IL', 'Day', 45, null, 374, 'Permanent', true, 70276, '• MD/DO with General Surgery board cert
• IL license
• 3+ yrs
• Signing + visa', 'Permanent position at VA Chicago Healthcare System. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j264', 'seed', 'dde04cdc-a5f7-5294-b849-eef5a5f39ae0', 'CRNA Permanent — Chicago', 'CRNA', 'Anesthesiology', 'Chicago', 'IL', 'Day', 40, null, 168, 'Permanent', false, 18073, '• Active CRNA cert
• IL license
• 3+ yrs experience
• Signing + relocation', 'Permanent position at VA Chicago Healthcare System. Full benefits, retirement matching.', 'open', now() - interval '17 days', now()),
  ('seed::j265', 'seed', 'dde04cdc-a5f7-5294-b849-eef5a5f39ae0', 'Psychiatry MD — Chicago', 'MD', 'Psychiatry', 'Chicago', 'IL', 'Day', 40, null, 291, 'Permanent', true, 50402, '• MD/DO with Psychiatry board cert
• IL license
• Outpatient + telepsych mix
• Visa support', 'Permanent position at VA Chicago Healthcare System. Full benefits, retirement matching.', 'open', now() - interval '16 days', now()),
  ('seed::j266', 'seed', 'dde04cdc-a5f7-5294-b849-eef5a5f39ae0', 'ICU RN — Chicago', 'RN', 'ICU', 'Chicago', 'IL', 'Night', 36, 13, 118, 'Travel', false, 2905, '• 2+ yrs adult ICU
• BLS, ACLS current
• Active IL RN license (compact accepted)
• Housing + travel stipend', '13-week travel contract at VA Chicago Healthcare System. Housing + weekly stipend included.', 'open', now() - interval '2 days', now()),
  ('seed::j267', 'seed', 'dde04cdc-a5f7-5294-b849-eef5a5f39ae0', 'Emergency Medicine MD — Chicago', 'MD', 'Emergency Medicine', 'Chicago', 'IL', 'Rotating', 36, null, 311, 'Permanent', true, 57501, '• MD/DO with EM board cert
• IL license
• 3+ yrs post-residency
• Visa support', 'Permanent position at VA Chicago Healthcare System. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j268', 'seed', 'c678e9b8-c633-5bce-8469-fef08e06ccb9', 'CRNA — Dallas', 'CRNA', 'Anesthesiology', 'Dallas', 'TX', 'Day', 40, 13, 189, 'Travel', false, 4985, '• Active CRNA cert
• Active TX license
• 2+ yrs CRNA experience
• ACLS, PALS, BLS current', '13-week travel contract at SCA Surgical Care Affiliates - Dallas, mixed outpatient cases. Housing + weekly stipend included.', 'open', now() - interval '4 days', now()),
  ('seed::j269', 'seed', 'c678e9b8-c633-5bce-8469-fef08e06ccb9', 'PACU RN — Dallas', 'RN', 'PACU', 'Dallas', 'TX', 'Day', 40, 13, 76, 'Travel', false, 3493, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• TX RN license
• Housing stipend', '13-week travel contract at SCA Surgical Care Affiliates - Dallas, mixed outpatient cases. Housing + weekly stipend included.', 'open', now() - interval '20 days', now()),
  ('seed::j270', 'seed', '8284e749-2909-5501-b2ca-0c3653ea4086', 'PACU RN — Miami', 'RN', 'PACU', 'Miami', 'FL', 'Day', 40, 13, 93, 'Travel', false, 1528, '• 2+ yrs PACU or ICU
• BLS, ACLS, PALS
• FL RN license
• Housing stipend', '13-week travel contract at Ambulatory Surgical Center of Miami, mixed outpatient cases. Housing + weekly stipend included.', 'open', now() - interval '18 days', now()),
  ('seed::j271', 'seed', '8284e749-2909-5501-b2ca-0c3653ea4086', 'CRNA Permanent — Miami', 'CRNA', 'Anesthesiology', 'Miami', 'FL', 'Day', 40, null, 191, 'Permanent', false, 16527, '• Active CRNA cert
• FL license
• 3+ yrs experience
• Signing + relocation', 'Permanent position at Ambulatory Surgical Center of Miami, mixed outpatient cases. Full benefits, retirement matching.', 'open', now() - interval '8 days', now()),
  ('seed::j272', 'seed', 'db29c879-8d57-5ab5-9bb4-a7888c2241c1', 'LVN/LPN — Redding', 'LPN', 'SNF / Long-Term Care', 'Redding', 'CT', 'Night', 36, null, 36, 'Permanent', false, 2020, '• Active CT LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Genesis Healthcare - Meadow Ridge, 120+ bed SNF. Full benefits, retirement matching.', 'open', now() - interval '10 days', now()),
  ('seed::j273', 'seed', 'db29c879-8d57-5ab5-9bb4-a7888c2241c1', 'Med-Surg RN — Redding', 'RN', 'Med-Surg', 'Redding', 'CT', 'Day', 36, 13, 80, 'Travel', false, 2444, '• 1+ yr Med-Surg
• BLS required
• CT RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at Genesis Healthcare - Meadow Ridge, 120+ bed SNF. Housing + weekly stipend included.', 'open', now() - interval '9 days', now()),
  ('seed::j274', 'seed', '7811c108-d2af-5090-9c20-5b2ce63aed96', 'LVN/LPN — Nashville', 'LPN', 'SNF / Long-Term Care', 'Nashville', 'TN', 'Night', 36, null, 39, 'Permanent', false, 1935, '• Active TN LVN/LPN license
• Must pass state registry checks
• 1+ yr long-term care
• G-tube and wound care preferred', 'Permanent position at Brookdale Senior Living, 120+ bed SNF. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j275', 'seed', '7811c108-d2af-5090-9c20-5b2ce63aed96', 'Med-Surg RN — Nashville', 'RN', 'Med-Surg', 'Nashville', 'TN', 'Day', 36, 13, 68, 'Travel', false, 1785, '• 1+ yr Med-Surg
• BLS required
• TN RN license (compact accepted)
• Weekly stipend + completion bonus', '13-week travel contract at Brookdale Senior Living, 120+ bed SNF. Housing + weekly stipend included.', 'open', now() - interval '7 days', now()),
  ('seed::j276', 'seed', 'f90c96cf-0f2b-583e-b790-35b4759a8895', 'Home Health RN — Baton Rouge', 'RN', 'Home Health', 'Baton Rouge', 'LA', 'Day', 40, null, 72, 'Permanent', false, 3699, '• Active LA RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position with Amedisys Home Health, patient home visits across the metro. Full benefits, retirement matching.', 'open', now() - interval '11 days', now()),
  ('seed::j277', 'seed', 'f90c96cf-0f2b-583e-b790-35b4759a8895', 'Family Medicine NP — Baton Rouge', 'NP', 'Family Medicine', 'Baton Rouge', 'LA', 'Day', 36, null, 124, 'Permanent', false, 7188, '• Active LA NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position with Amedisys Home Health, patient home visits across the metro. Full benefits, retirement matching.', 'open', now() - interval '1 days', now()),
  ('seed::j278', 'seed', 'ae2adcb3-29ee-5571-9b68-3c715f5e3aa9', 'Family Medicine NP Locum — Lafayette', 'NP', 'Family Medicine', 'Lafayette', 'LA', 'Day', 36, 26, 102, 'Locums', false, 0, '• Active LA NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum with LHC Group Home Health, patient home visits across the metro. Malpractice covered, travel included.', 'open', now() - interval '15 days', now()),
  ('seed::j279', 'seed', 'ae2adcb3-29ee-5571-9b68-3c715f5e3aa9', 'Family Medicine NP — Lafayette', 'NP', 'Family Medicine', 'Lafayette', 'LA', 'Day', 36, null, 126, 'Permanent', false, 8967, '• Active LA NP license
• Family medicine focus
• Bilingual a plus
• Sign-on + relocation', 'Permanent position with LHC Group Home Health, patient home visits across the metro. Full benefits, retirement matching.', 'open', now() - interval '12 days', now()),
  ('seed::j280', 'seed', 'ae2adcb3-29ee-5571-9b68-3c715f5e3aa9', 'Home Health RN — Lafayette', 'RN', 'Home Health', 'Lafayette', 'LA', 'Day', 40, null, 58, 'Permanent', false, 4260, '• Active LA RN license
• Reliable transportation
• OASIS-E experience required
• 2+ yrs RN experience', 'Permanent position with LHC Group Home Health, patient home visits across the metro. Full benefits, retirement matching.', 'open', now() - interval '18 days', now()),
  ('seed::j281', 'seed', 'b662023a-e72b-5ebf-8ebb-77ce1d43b504', 'Urgent Care PA — Denver', 'PA', 'Urgent Care', 'Denver', 'CO', 'Rotating', 36, null, 98, 'Permanent', false, 6956, '• PA-C with CO license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Kaiser Permanente Denver Clinic outpatient clinic. Full benefits, retirement matching.', 'open', now() - interval '19 days', now()),
  ('seed::j282', 'seed', 'b662023a-e72b-5ebf-8ebb-77ce1d43b504', 'Pediatric PA — Denver', 'PA', 'Pediatrics', 'Denver', 'CO', 'Day', 36, null, 80, 'Permanent', false, 4956, '• PA-C with active CO license
• Peds or family medicine experience
• Spanish a plus', 'Permanent position at Kaiser Permanente Denver Clinic outpatient clinic. Full benefits, retirement matching.', 'open', now() - interval '14 days', now()),
  ('seed::j283', 'seed', 'b662023a-e72b-5ebf-8ebb-77ce1d43b504', 'Family Medicine NP Locum — Denver', 'NP', 'Family Medicine', 'Denver', 'CO', 'Day', 36, 26, 99, 'Locums', false, 0, '• Active CO NP license
• 2+ yrs primary care
• Travel + housing covered', '26-week locum at Kaiser Permanente Denver Clinic outpatient clinic. Malpractice covered, travel included.', 'open', now() - interval '11 days', now()),
  ('seed::j284', 'seed', '55673469-6270-53a5-88aa-b556a1576c60', 'Internal Medicine MD — Dallas', 'MD', 'Internal Medicine', 'Dallas', 'TX', 'Day', 40, null, 267, 'Permanent', true, 50965, '• MD/DO with IM board cert
• TX license
• Active DEA
• Visa sponsorship', 'Permanent position at Cottonwood Children''s Medical Group outpatient clinic. Full benefits, retirement matching.', 'open', now() - interval '5 days', now()),
  ('seed::j285', 'seed', '55673469-6270-53a5-88aa-b556a1576c60', 'Urgent Care PA — Dallas', 'PA', 'Urgent Care', 'Dallas', 'TX', 'Rotating', 36, null, 91, 'Permanent', false, 5303, '• PA-C with TX license
• Urgent care or ER experience
• 1+ yr
• Sign-on', 'Permanent position at Cottonwood Children''s Medical Group outpatient clinic. Full benefits, retirement matching.', 'open', now() - interval '5 days', now()),
  ('seed::j286', 'seed', '55673469-6270-53a5-88aa-b556a1576c60', 'Family Medicine MD — Dallas', 'MD', 'Family Medicine', 'Dallas', 'TX', 'Day', 40, null, 247, 'Permanent', true, 44339, '• MD/DO with FM board cert
• TX license
• 3+ yrs preferred
• Visa support available', 'Permanent position at Cottonwood Children''s Medical Group outpatient clinic. Full benefits, retirement matching.', 'open', now() - interval '11 days', now())
on conflict (id) do nothing;
