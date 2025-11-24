import { User } from "../models/User.js";
const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

export const getCalendar = async ({email, date}, res) => {
    if (!email || !date) {
        return res.status(400).json({ error: "Proszę wypełnić wszystkie pola formularza." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Nie znaleziono użytkownika." });

    const activities = user?.activities || {};
    const day = activities?.[date] || [];

    const weekDay = days[new Date(date)?.getDay()];

    const result = [
        ...day,
        ...(user?.schedule?.[weekDay] || [])
    ];

    return res.status(200).json(result);
};
