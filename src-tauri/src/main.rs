// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use magic_crypt::{new_magic_crypt, MagicCryptTrait};

#[tauri::command]
fn encrypt_or_decrypt(text: &str, password: &str, encrypt: bool) -> String {
    let mcrypt = new_magic_crypt!(password);

    if encrypt {
        return mcrypt.encrypt_str_to_base64(&text);
    } else {
        let decrypt_text = match (mcrypt.decrypt_base64_to_string(&text)) {
            Ok(resp) => resp,
            Err(_err) => format!("Error decrypting string!"),
        };
        return decrypt_text;
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![encrypt_or_decrypt])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
