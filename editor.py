import json
import tkinter as tk
from tkinter import messagebox

FILE = "data/singers.json"

class Editor:
    def __init__(self, root):
        root.title("歌手 Wiki 编辑器")
        root.geometry("500x600")

        with open(FILE, "r", encoding="utf-8") as f:
            self.data = json.load(f)

        self.listbox = tk.Listbox(root)
        self.listbox.pack(fill="x")
        for s in self.data:
            self.listbox.insert(tk.END, s["name"])

        self.listbox.bind("<<ListboxSelect>>", self.load)

        self.fields = {}
        for label in ["id", "name", "company", "photo"]:
            tk.Label(root, text=label).pack()
            e = tk.Entry(root)
            e.pack(fill="x")
            self.fields[label] = e

        tk.Label(root, text="social (JSON)").pack()
        self.social = tk.Text(root, height=5)
        self.social.pack(fill="x")

        tk.Button(root, text="💾 保存", command=self.save).pack(pady=10)

    def load(self, _):
        i = self.listbox.curselection()
        if not i:
            return
        s = self.data[i[0]]
        for k in self.fields:
            self.fields[k].delete(0, tk.END)
            self.fields[k].insert(0, s.get(k, ""))
        self.social.delete("1.0", tk.END)
        self.social.insert("1.0", json.dumps(s.get("social", {}), indent=2, ensure_ascii=False))

    def save(self):
        i = self.listbox.curselection()
        if not i:
            return
        s = self.data[i[0]]
        for k in self.fields:
            s[k] = self.fields[k].get()
        try:
            s["social"] = json.loads(self.social.get("1.0", tk.END))
        except:
            messagebox.showerror("错误", "社交链接不是合法 JSON")
            return
        with open(FILE, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)
        messagebox.showinfo("成功", "已保存")

root = tk.Tk()
Editor(root)
root.mainloop()
