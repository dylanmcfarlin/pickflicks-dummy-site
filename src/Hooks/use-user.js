import { useState, useEffect } from 'react';

export default function UseUser() {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");

    return { username, setUsername, userId, setUserId, token, setToken };
}