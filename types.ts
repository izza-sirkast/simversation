export interface User {
    user_id: string;
    username: string;
}

export interface Message {
    private_chat_log_id?: number;
    private_chat_id: string;
    sender_id: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface GroupMessage {
    group_chat_log_id?: number;
    group_chat_id: string;
    sender_id: string;
    username: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface Friend {
    private_chat_id: string;
    user_1_id: string;
    user_2_id: string;
    created_at: string;
    updated_at: string;
    friend: User;
}

export interface PrivateChat {
    private_chat_id: string;
    user_1_id: string;
    user_2_id: string;
    created_at: string;
    updated_at: string;
}

export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string) => Promise<void>;
}

