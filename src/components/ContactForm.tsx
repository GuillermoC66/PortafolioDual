import { AnimatePresence, motion, type Transition } from "motion/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { CheckCircle2, Loader2, Paintbrush, Send, Terminal } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useTheme, type Theme } from "../context/ThemeContext";
import { getLink } from "../data/links";

/**
 * Formspree Endpoint Form ID
 * Form URL: https://formspree.io/f/mwllpken
 */
export const FORMSPREE_FORM_ID = "mwllpken";

interface ContactFormProps {
    mode?: Theme;
}

export const ContactForm = ({ mode }: ContactFormProps) => {
    const { theme: contextTheme } = useTheme();
    const activeTheme = mode ?? contextTheme;
    const [selected, setSelected] = useState<"company" | "individual">("individual");

    return (
        <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
            <div className="w-full max-w-6xl mx-auto shadow-2xl flex flex-col-reverse lg:flex-row rounded-2xl overflow-hidden border border-accent/25 transition-colors duration-500 bg-background">
                <Form theme={activeTheme} selected={selected} setSelected={setSelected} />
                <Images theme={activeTheme} selected={selected} />
            </div>
        </section>
    );
};

interface FormProps {
    theme: Theme;
    selected: "company" | "individual";
    setSelected: Dispatch<SetStateAction<"company" | "individual">>;
}

const Form = ({ theme, selected, setSelected }: FormProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [message, setMessage] = useState("");

    const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID, {
        data: {
            portfolio_mode: theme === "engineer" ? "Engineer (Logic/Tech)" : "Artist (Instinct/Art)",
            client_type: selected === "company" ? `Company / Studio (${companyName || "N/A"})` : "Individual",
        },
    });

    const handleReset = () => {
        setName("");
        setEmail("");
        setCompanyName("");
        setMessage("");
        reset();
    };

    const isEngineer = theme === "engineer";

    return (
        <form
            onSubmit={handleSubmit}
            className={`p-8 sm:p-10 w-full transition-colors duration-700 ${isEngineer
                ? selected === "company"
                    ? "bg-[#091522] text-slate-100"
                    : "bg-[#0a1826] text-slate-100"
                : selected === "company"
                    ? "bg-[#500724] text-rose-50"
                    : "bg-[#701a35] text-rose-50"
                }`}
        >
            {/* Hidden fields for Formspree serialization & spam protection */}
            <input type="hidden" name="_subject" value={`New Portfolio Message from ${name || "Visitor"} (${theme})`} />
            <input type="hidden" name="portfolio_mode" value={theme} />
            <input type="hidden" name="client_type" value={selected} />
            {/* Honeypot field - catches bots that auto-fill every field */}
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        {isEngineer ? (
                            <Terminal className="size-5 text-emerald-400" />
                        ) : (
                            <Paintbrush className="size-5 text-rose-300" />
                        )}
                        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            {isEngineer ? "Engineering Inquiries" : "Artistic Inquiries"}
                        </h3>
                    </div>
                    <p className={`mt-1 text-sm ${isEngineer ? "text-slate-300" : "text-rose-200/90"}`}>
                        {isEngineer
                            ? "Have a software architecture, 3D/VR, or tech project in mind? Let's talk."
                            : "Have a comic, character illustration, or visual direction project in mind? Let's connect."}
                    </p>
                </div>

                <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border self-start sm:self-auto ${isEngineer
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-rose-300/30 bg-rose-500/20 text-rose-200"
                        }`}
                >
                    <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isEngineer ? "bg-emerald-400" : "bg-rose-400"
                            }`} />
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isEngineer ? "bg-emerald-500" : "bg-rose-400"
                            }`} />
                    </span>
                    <span>Formspree Live</span>
                </div>
            </div>

            {state.succeeded ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-xl p-6 backdrop-blur-md border text-center space-y-4 my-8 ${isEngineer
                        ? "bg-slate-900/80 border-emerald-500/30 text-slate-100"
                        : "bg-rose-950/70 border-rose-400/30 text-rose-100"
                        }`}
                >
                    <CheckCircle2
                        className={`size-12 mx-auto ${isEngineer ? "text-emerald-400" : "text-rose-300"
                            }`}
                    />
                    <h4 className="text-2xl font-bold">Message Sent to Memx!</h4>
                    <p className={`text-sm max-w-md mx-auto leading-relaxed ${isEngineer ? "text-slate-300" : "text-rose-200"}`}>
                        Thank you <strong>{name || "friend"}</strong>! Your message has been received and delivered directly to Memx's inbox.
                    </p>
                    <div
                        className={`text-xs p-3.5 rounded-lg text-left max-w-md mx-auto font-mono space-y-1 border ${isEngineer
                            ? "bg-slate-950/60 border-slate-800 text-slate-300"
                            : "bg-black/30 border-rose-900/50 text-rose-200"
                            }`}
                    >
                        <div><strong>Sender:</strong> {email || "Delivered"}</div>
                        <div><strong>Perspective:</strong> {isEngineer ? "Engineer (Logic/Tech)" : "Artist (Instinct/Art)"}</div>
                        <div><strong>Client Type:</strong> {selected === "company" ? `Company (${companyName || "N/A"})` : "Individual"}</div>
                        <div><strong>Status:</strong> <span className="text-emerald-400">Delivered via Formspree</span></div>
                    </div>
                    <button
                        type="button"
                        onClick={handleReset}
                        className={`mt-4 px-6 py-2.5 font-bold rounded-lg transition shadow-sm text-sm cursor-pointer ${isEngineer
                            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                            : "bg-rose-400 hover:bg-rose-300 text-rose-950"
                            }`}
                    >
                        Send another message
                    </button>
                </motion.div>
            ) : (
                <>
                    {/* General Errors if any */}
                    {state.errors && state.errors.getFormErrors().length > 0 && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm">
                            <p className="font-semibold">Unable to send message:</p>
                            <ul className="list-disc list-inside mt-1">
                                {state.errors.getFormErrors().map((err, idx) => (
                                    <li key={idx}>{err.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Name input */}
                    <div className="mb-6">
                        <label htmlFor="contact-name" className="text-xl sm:text-2xl mb-2 block font-medium">
                            Hi Memx! My name is...
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name..."
                            disabled={state.submitting}
                            className={`p-3 rounded-md w-full border text-base transition-colors duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 ${isEngineer
                                ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/25"
                                : "bg-rose-950/60 border-rose-400/30 text-rose-50 placeholder-rose-200/50 focus:border-rose-300 focus:ring-rose-400/25"
                                }`}
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-rose-300 mt-1.5" />
                    </div>

                    {/* Email input */}
                    <div className="mb-6">
                        <label htmlFor="contact-email" className="text-xl sm:text-2xl mb-2 block font-medium">
                            and you can reach me at...
                        </label>
                        <input
                            id="contact-email"
                            name="email"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            disabled={state.submitting}
                            className={`p-3 rounded-md w-full border text-base transition-colors duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 ${isEngineer
                                ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/25"
                                : "bg-rose-950/60 border-rose-400/30 text-rose-50 placeholder-rose-200/50 focus:border-rose-300 focus:ring-rose-400/25"
                                }`}
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-rose-300 mt-1.5" />
                    </div>

                    {/* Company/individual toggle */}
                    <div className="mb-6">
                        <p className="text-xl sm:text-2xl mb-2 font-medium">and I represent...</p>
                        <FormSelect theme={theme} selected={selected} setSelected={setSelected} disabled={state.submitting} />
                    </div>

                    {/* Company name */}
                    <AnimatePresence>
                        {selected === "company" && (
                            <motion.div
                                initial={{ marginTop: -80, opacity: 0 }}
                                animate={{ marginTop: 0, opacity: 1 }}
                                exit={{ marginTop: -80, opacity: 0 }}
                                transition={BASE_TRANSITION}
                                className="mb-6"
                            >
                                <label htmlFor="contact-company" className="text-xl sm:text-2xl mb-2 block font-medium">
                                    by the name of...
                                </label>
                                <input
                                    id="contact-company"
                                    name="company"
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder={isEngineer ? "Company, startup, or studio name..." : "Studio, publisher, or agency name..."}
                                    disabled={state.submitting}
                                    className={`p-3 rounded-md w-full border text-base transition-colors duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 ${isEngineer
                                        ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/25"
                                        : "bg-rose-950/60 border-rose-400/30 text-rose-50 placeholder-rose-200/50 focus:border-rose-300 focus:ring-rose-400/25"
                                        }`}
                                />
                                <ValidationError prefix="Company" field="company" errors={state.errors} className="text-xs text-rose-300 mt-1.5" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Info / Message */}
                    <div className="mb-6">
                        <label htmlFor="contact-message" className="text-xl sm:text-2xl mb-2 block font-medium">
                            I'd love to ask about...
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={state.submitting}
                            placeholder={
                                isEngineer
                                    ? "Tell me about your technical stack, architecture ideas, or project goals :)"
                                    : "Tell me about your visual story, character concepts, or creative project :)"
                            }
                            className={`min-h-[140px] resize-none p-3 rounded-md w-full border text-base transition-colors duration-300 focus:outline-none focus:ring-2 disabled:opacity-50 ${isEngineer
                                ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/25"
                                : "bg-rose-950/60 border-rose-400/30 text-rose-50 placeholder-rose-200/50 focus:border-rose-300 focus:ring-rose-400/25"
                                }`}
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-xs text-rose-300 mt-1.5" />
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={state.submitting ? {} : { scale: 1.01 }}
                        whileTap={state.submitting ? {} : { scale: 0.99 }}
                        type="submit"
                        disabled={state.submitting}
                        className={`text-lg text-center rounded-lg w-full py-3.5 font-bold shadow-lg flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 ${isEngineer
                            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
                            : "bg-rose-400 hover:bg-rose-300 text-rose-950 shadow-rose-500/25"
                            }`}
                    >
                        {state.submitting ? (
                            <>
                                <Loader2 className="size-5 animate-spin" />
                                <span>Sending to Memx...</span>
                            </>
                        ) : (
                            <>
                                <Send className="size-5" />
                                <span>Send Message</span>
                            </>
                        )}
                    </motion.button>
                </>
            )}
        </form>
    );
};

interface FormSelectProps {
    theme: Theme;
    selected: "company" | "individual";
    setSelected: Dispatch<SetStateAction<"company" | "individual">>;
    disabled?: boolean;
}

const FormSelect = ({ theme, selected, setSelected, disabled }: FormSelectProps) => {
    const isEngineer = theme === "engineer";

    return (
        <div
            className={`border rounded-lg overflow-hidden font-medium w-fit flex p-0.5 ${isEngineer
                ? "border-emerald-500/30 bg-slate-800/80"
                : "border-rose-400/40 bg-rose-950/50"
                }`}
        >
            <button
                type="button"
                disabled={disabled}
                className={`text-sm px-4 py-2 transition-colors duration-300 relative font-semibold rounded-md ${selected === "individual"
                    ? isEngineer ? "text-slate-950" : "text-rose-950"
                    : isEngineer ? "text-slate-300 hover:text-white" : "text-rose-200 hover:text-white"
                    }`}
                onClick={() => setSelected("individual")}
            >
                <span className="relative z-10">An individual</span>
                {selected === "individual" && (
                    <motion.div
                        transition={BASE_TRANSITION}
                        layoutId="form-tab"
                        className={`absolute inset-0 rounded-md z-0 ${isEngineer ? "bg-emerald-400" : "bg-rose-400"
                            }`}
                    />
                )}
            </button>
            <button
                type="button"
                disabled={disabled}
                className={`text-sm px-4 py-2 transition-colors duration-300 relative font-semibold rounded-md ${selected === "company"
                    ? isEngineer ? "text-slate-950" : "text-rose-950"
                    : isEngineer ? "text-slate-300 hover:text-white" : "text-rose-200 hover:text-white"
                    }`}
                onClick={() => setSelected("company")}
            >
                <span className="relative z-10">A company / studio</span>
                {selected === "company" && (
                    <motion.div
                        transition={BASE_TRANSITION}
                        layoutId="form-tab"
                        className={`absolute inset-0 rounded-md z-0 ${isEngineer ? "bg-emerald-400" : "bg-rose-400"
                            }`}
                    />
                )}
            </button>
        </div>
    );
};

const PANELS = {
    engineer: {
        individual: {
            image: getLink("internaImage"),
            badge: "Tech Consulting & Code",
            title: "Interactive 3D, VR & Full-Stack Systems",
            description: "Building robust tools, fluid interactions, and high-performance software.",
        },
        company: {
            image: getLink("engineerProjectScreenshot"),
            badge: "Enterprise & Systems",
            title: "Scalable Architecture & Specialized Tech",
            description: "End-to-end software development for teams, studios, and production pipelines.",
        },
    },
    artist: {
        individual: {
            image: getLink("metroImage"),
            badge: "Character Art & Illustration",
            title: "Evocative Characters & Visual Concepts",
            description: "Bringing personal ideas, stories, and emotions to life through art.",
        },
        company: {
            image: getLink("artistCarouselComic"),
            badge: "Comics & Visual Direction",
            title: "Sequential Storytelling & Publishing",
            description: "Editorial illustration, comic spreads, and cohesive artistic world-building.",
        },
    },
} as const;

const Images = ({
    theme,
    selected,
}: {
    theme: Theme;
    selected: "company" | "individual";
}) => {
    const isEngineer = theme === "engineer";
    const panel = PANELS[theme][selected];

    return (
        <div className="bg-slate-950 relative overflow-hidden w-full min-h-[300px] lg:min-h-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${theme}-${selected}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-slate-950"
                    style={{
                        backgroundImage: `url(${panel.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </AnimatePresence>

            <div
                className={`absolute inset-0 transition-colors duration-700 pointer-events-none flex flex-col justify-end p-8 text-white ${isEngineer
                    ? "bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"
                    : "bg-gradient-to-t from-[#500724] via-[#500724]/40 to-transparent"
                    }`}
            >
                <motion.div
                    key={`text-${theme}-${selected}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border ${isEngineer
                            ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                            : "border-rose-300/40 bg-rose-500/20 text-rose-200"
                            }`}
                    >
                        {panel.badge}
                    </span>
                    <p className="text-2xl font-bold tracking-tight text-white leading-snug">
                        {panel.title}
                    </p>
                    <p className={`mt-1.5 text-sm max-w-sm leading-relaxed ${isEngineer ? "text-slate-300" : "text-rose-100/90"}`}>
                        {panel.description}
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export { ContactForm as ShiftingContactForm };
export default ContactForm;

const BASE_TRANSITION: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
