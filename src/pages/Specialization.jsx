import { Icon, Breadcrumb } from "../components/ui.jsx";
import { hrefTo } from "../hooks/useRoute.js";
import { PUBS, AREA_MATCH, matchArea } from "../lib/pubs.js";
import { PROFILE, LINKS, RESEARCH_INTERESTS } from "../lib/profile.js";
import agriculture from "../assets/illustrations/agriculture.jpg";

const find = (frag) => PUBS.find((p) => p.title.toLowerCase().includes(frag.toLowerCase()));
const pick = (...frags) => frags.map(find).filter(Boolean);
const cite = (p) => `${p.venue}${p.year ? `, ${p.year}` : ""}`;

const SIX_AREAS = [
  "Artificial Intelligence (AI) & Machine Learning (ML)",
  "Extended Reality (XR)",
  "Augmented Reality (AR) & Virtual Reality (VR)",
  "Intelligent Transportation System (ITS)",
  "Autonomous Vehicle",
  "IoT (Internet of Things)",
];

function Pillar({ id, n, tag, title, intro, children, aside, flip }) {
  return (
    <section className="relative bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-md transition-all hover:shadow-xl" id={id}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        <div className={`${aside ? "lg:col-span-7" : "lg:col-span-12"} space-y-space-md ${flip ? "order-2 lg:order-1" : ""}`}>
          <span className="block font-label-md text-label-md text-on-surface-variant">{tag}</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">{title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{intro}</p>
          {children}
        </div>
        {aside && <div className={`lg:col-span-5 flex flex-col gap-space-md ${flip ? "order-1 lg:order-2" : ""}`}>{aside}</div>}
      </div>
    </section>
  );
}

function Illustration({ src, alt, caption, h = "h-56" }) {
  return (
    <figure className={`relative rounded-xl overflow-hidden shadow-sm ${h} w-full m-0`}>
      <img className="w-full h-full object-cover" src={src} alt={alt} loading="lazy" />
      <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-space-md">
        <span className="font-label-badge text-label-badge uppercase tracking-wider text-white">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* A publication title; links out to the record (DOI) when one is listed. */
function PubTitle({ p, className }) {
  if (!p.link) return <span className={className}>{p.title}</span>;
  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} (opens publisher record)`} className={`${className} hover:underline underline-offset-2`}>
      {p.title}
      <Icon name="arrow_outward" className="inline-block align-[-2px] ml-1 text-[14px]" />
    </a>
  );
}

function PubList({ items }) {
  return (
    <div className="space-y-space-xs">
      {items.map((p) => (
        <div key={p.id} className="p-space-md bg-surface-container-low rounded-lg transition-all duration-200 hover:bg-surface-container-lowest hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
          <div className="mb-1"><PubTitle p={p} className="font-label-md text-label-md font-semibold text-on-surface" /></div>
          <p className="font-body-md text-body-md text-on-surface-variant">{cite(p)}</p>
        </div>
      ))}
    </div>
  );
}

const itsList = matchArea(AREA_MATCH.its);
const xrList = matchArea(AREA_MATCH.xr);

const NETWORK_CARDS = [
  { frag: "Cooperative Cognitive Intelligence for Internet of Vehicles" },
  { frag: "Optimizing spectral efficiency" },
  { frag: "Queuing model for Cognitive Radio" },
  { frag: "Vehicle to vehicle communication using ZigBee" },
].map((c) => ({ ...c, p: find(c.frag) })).filter((c) => c.p);

export default function Specialization() {
  const patent = PUBS.find((p) => p.kind === "pat" && p.title.startsWith("Cooperative Cognitive"));

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-white">
        <div className="max-w-7xl mx-auto px-gutter-desktop py-space-xl">
          <Breadcrumb current="Area of Specialization" light />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-end">
            <div className="lg:col-span-8 space-y-space-sm">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-[3px] bg-white/10 text-white font-label-badge text-label-badge rounded uppercase tracking-wider">
                Disciplines • Six Areas
              </div>
              <h1 className="font-headline-lg text-headline-lg text-white tracking-tight">Areas of Specialization &amp; Research</h1>
              <p className="font-body-lg text-body-lg text-white/80 max-w-3xl leading-relaxed">
                Research spanning vehicular networks, intelligent transportation, autonomous vehicles, IoT, AI and machine learning, and extended reality. Each area below is backed by publications from the record.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-space-xs p-space-md bg-white/10 border border-white/15 rounded-xl">
              <span className="font-label-badge text-label-badge uppercase tracking-wider text-white/70">Listed Specializations</span>
              <ul className="flex flex-wrap gap-space-xs text-label-md font-label-md text-on-surface">
                {SIX_AREAS.map((a) => (
                  <li key={a} className="px-space-sm py-1 bg-surface-container-lowest rounded shadow-sm">{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-gutter-desktop py-space-2xl w-full space-y-space-2xl">
        {/* Pillar 1 */}
        <Pillar
          id="autonomous-its" n="01" tag="Vector I • Autonomous Vehicles & ITS"
          title="Autonomous Vehicles & Intelligent Transportation"
          intro="Cooperative intelligence for vehicles and transport systems: fusing sensor data for object detection, detecting pedestrians from LiDAR and camera input, and improving decision-making in autonomous vehicles with neural networks."
        >
          <div className="space-y-space-sm pt-space-xs">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Selected Publications</h3>
            <PubList items={pick(
              "Autonomous vehicles decision-making enhancement",
              "Fully convolutional neural networks for LIDAR",
              "Procuring cooperative intelligence in autonomous vehicles",
              "Real-time Pothole Detection using YOLOv5"
            )} />
          </div>
        </Pillar>

        {/* Pillar 2 */}
        <Pillar
          id="vehicular-networks" n="02" tag="Vector II • Connected Mobility" flip
          title="Vehicular Networks & the Internet of Vehicles"
          intro="Where the research began: communication between vehicles and devices, cooperative cognitive intelligence for the Internet of Vehicles, and queuing models for cognitive radio and spectral efficiency."
          aside={
            <>
              <div className="p-space-lg bg-gradient-to-br from-[#1A1A1A] to-[#333333] text-on-primary-container rounded-xl flex flex-col justify-between">
                <div>
                  <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-primary-fixed-variant">Patent</span>
                  <h3 className="font-headline-md text-headline-md text-inverse-on-surface mt-1 mb-space-sm">Cooperative Cognitive Intelligence for Internet of Vehicles</h3>
                  <p className="font-body-citation text-body-citation text-on-primary-fixed-variant leading-relaxed">
                    {patent ? patent.venue : "Korean patent, granted 2016"}.
                  </p>
                </div>
                <div className="mt-space-md pt-space-sm flex flex-wrap items-center justify-between gap-x-space-md gap-y-space-sm">
                  <div>
                    <span className="block text-headline-sm font-headline-sm text-surface-bright">{itsList.length}</span>
                    <span className="font-label-badge text-label-badge text-outline uppercase">Related papers</span>
                  </div>
                  <div>
                    <span className="block text-headline-sm font-headline-sm text-surface-bright">2014</span>
                    <span className="font-label-badge text-label-badge text-outline uppercase">First paper</span>
                  </div>
                  <div>
                    <span className="block text-headline-sm font-headline-sm text-surface-bright">2016</span>
                    <span className="font-label-badge text-label-badge text-outline uppercase">Patent granted</span>
                  </div>
                </div>
              </div>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
            {NETWORK_CARDS.map((c) => (
              <div key={c.p.id} className="p-space-md bg-surface-container-low rounded-lg space-y-1 transition-all duration-200 hover:bg-surface-container-lowest hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
                <div><PubTitle p={c.p} className="font-label-md text-label-md font-semibold text-on-surface" /></div>
                <p className="font-body-citation text-body-citation text-on-surface-variant">{cite(c.p)}</p>
              </div>
            ))}
          </div>
        </Pillar>

        {/* Pillar 3 */}
        <Pillar
          id="ai-iot" n="03" tag="Vector III • Intelligent Sensing"
          title="Artificial Intelligence, Machine Learning & IoT"
          intro="Machine learning and the Internet of Things applied to practical sensing problems: predicting pests and disease in crops, UAV vision for precision agriculture, water-quality monitoring and energy management."
          aside={
            <>
              <Illustration src={agriculture} alt="Illustration of a drone surveying agricultural fields" caption="Illustration • UAV sensing in agriculture" />
            </>
          }
        >
          <div className="space-y-space-sm pt-space-xs">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Selected Publications</h3>
            <PubList items={pick(
              "Deploying YOLOv8m",
              "Fuzzy-Based Intelligent Crop Prediction",
              "Machine Vision in UAV Data Analytics",
              "IoT-Enabled Chlorine Level"
            )} />
          </div>
        </Pillar>

        {/* Pillar 4 */}
        <Pillar
          id="xr" n="04" tag="Vector IV • Immersive Reality" flip
          title="Extended, Augmented & Virtual Reality"
          intro="Immersive technology through the Centre for Immersive Reality and Gaming (CIRG), which Dr. Daniel heads: immersive game environments for historical learning and 3D modelling for digital preservation."
          aside={
            <>
              <div className="p-space-lg bg-surface-container rounded-xl space-y-space-sm">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-secondary">Centre Head</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Centre for Immersive Reality and Gaming</h3>
                <p className="font-body-citation text-body-citation text-on-surface-variant leading-relaxed">
                  CIRG at Karpagam Academy of Higher Education works on augmented reality, virtual reality and extended reality.
                </p>
                <a href={LINKS.cirg} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-space-xs text-secondary font-label-md text-label-md hover:underline">
                  <span>Visit the CIRG website</span>
                  <Icon name="arrow_outward" className="text-[14px]" />
                </a>
              </div>
              <div className="p-space-lg bg-surface-container-high rounded-xl flex items-center gap-space-lg">
                <span className="font-headline-lg text-[3rem] leading-none font-semibold text-on-surface tabular-nums lining-nums">{xrList.length}</span>
                <div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface block">related publications</span>
                  <span className="font-body-citation text-body-citation text-on-surface-variant">Matched by AR, VR, XR, immersive and 3D keywords.</span>
                </div>
              </div>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
            {pick(
              "Immersive Gamification",
              "Immersive Game Environment",
              "Virtual resurrection"
            ).map((p) => (
              <div key={p.id} className="p-space-md bg-surface-container-low rounded-lg space-y-1 transition-all duration-200 hover:bg-surface-container-lowest hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
                <div><PubTitle p={p} className="font-label-md text-label-md font-semibold text-on-surface" /></div>
                <p className="font-body-citation text-body-citation text-on-surface-variant">{cite(p)}</p>
              </div>
            ))}
          </div>
        </Pillar>

        {/* Environments */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-md">
          <div className="mb-space-lg">
            <span className="font-label-badge text-label-badge uppercase tracking-wider text-secondary">Research Environments</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Institutions &amp; Laboratories</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">Where the work has been carried out, from the Korean lab where it began to the immersive reality centre Dr. Daniel now leads.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
            {[
              { title: "Karpagam Academy of Higher Education", text: "Department of Computer Science and Engineering, Coimbatore. Dr. Daniel is an Assistant Professor here.", list: ["Computer Science and Engineering", "Coimbatore, India"] },
              { title: "Centre for Immersive Reality and Gaming", text: "Dr. Daniel is Head of CIRG, which focuses on immersive technology and games.", list: ["Augmented reality", "Virtual reality", "Extended reality"] },
              { title: "Earlier Research Placements", text: "Research and industry-lab experience before returning to India.", list: ["CCMP Lab, Kyungpook National University (Korea)", "Intel Labs, National Taiwan University (Taiwan)"] },
            ].map((c) => (
              <div key={c.title} className="p-space-lg bg-surface-container-low rounded-xl space-y-space-sm transition-all duration-200 hover:bg-surface-container-lowest hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{c.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{c.text}</p>
                <ul className="font-body-citation text-body-citation text-on-surface divide-y divide-surface-container-high pt-space-sm">
                  {c.list.map((l) => (
                    <li key={l} className="py-space-xs first:pt-0">{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration */}
        <section className="relative bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#3A3A3A] text-on-primary-container rounded-xl p-space-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop relative z-10">
            <div className="lg:col-span-8 space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-[2px] bg-surface-container-lowest text-primary rounded font-label-badge text-label-badge uppercase tracking-wider">Research Interests</div>
              <h2 className="font-headline-lg text-headline-lg text-surface-bright tracking-tight">Where the Work Is Heading</h2>
              <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl leading-relaxed">
                The research interests Dr. Daniel lists on his profile. Get in touch about collaboration, student projects or reviewing.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                {RESEARCH_INTERESTS.map((r, i) => (
                  <li key={r} className="p-space-md bg-surface-container-lowest/10 backdrop-blur-md rounded-lg">
                    <span className="font-label-md text-label-md font-semibold text-inverse-on-surface block">{i + 1}. {r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-between bg-surface-container-lowest/5 backdrop-blur-md p-space-lg rounded-xl">
              <div className="space-y-space-sm">
                <span className="font-label-badge text-label-badge uppercase tracking-wider text-on-primary-fixed-variant">Get in Touch</span>
                <h3 className="font-headline-md text-headline-md text-surface-bright">Start a Conversation</h3>
                <p className="font-body-md text-body-md text-on-primary-fixed-variant leading-relaxed">
                  Email Dr. Daniel with a short description of your project or question, and a link to relevant work if you have it.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md">
                <a className="inline-flex items-center justify-center gap-space-xs w-full py-space-sm px-space-md bg-surface-container-lowest text-primary rounded font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors shadow-md" href={hrefTo("contact")}>
                  <span>Contact Dr. Daniel</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </a>
                <a className="block text-center mt-space-xs font-code-doi text-code-doi text-on-primary-container hover:text-surface-bright break-all" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
