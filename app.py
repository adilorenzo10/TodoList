from flask import Flask, jsonify, redirect, render_template, request
import sqlite3 as sq

app = Flask(__name__)

def get_db():
    conn = sq.connect("todo.sqlite3")
    conn.row_factory = sq.Row
    return conn

@app.route("/")
def index():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT t.*, c.nome AS nome_categoria FROM todos AS t JOIN categories AS c ON t.categories_id = c.id")
    tasks = cur.fetchall()
    cur.execute("SELECT * FROM categories")
    categories = cur.fetchall()
    print(categories)  # Verifica che ci siano dati in 'categories'

    conn.close()
    return render_template("index.html", todos=tasks, categorie=categories)

@app.route("/add", methods=['POST'])
def add_task():
    conn = get_db()
    cur = conn.cursor()
    nome = request.form.get("nome")
    id_categoria = request.form.get("categoria")
    cur.execute("INSERT INTO todos(nome, categories_id) VALUES (?, ?)", (nome, id_categoria))
    conn.commit()
    conn.close()
    return redirect("/")

@app.route("/delete/<int:id>", methods=['DELETE'])
def delete_task(id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM todos AS t WHERE t.id = ?", (id,))
    conn.commit()
    conn.close()
    
    # Restituisci una risposta JSON di successo
    return jsonify({"success": True}), 200

@app.route("/edit/<int:id>", methods=['POST'])
def edit_task(id):
    conn = get_db()
    cur = conn.cursor()
    nome = request.form.get("nome")
    id_categoria = request.form.get("categoria")
    cur.execute("UPDATE todos SET nome = ?, categories_id = ?  WHERE id = ?", (nome, id_categoria, id,))
    conn.commit()
    conn.close()
    
    # Restituisci una risposta JSON di successo
    return jsonify({"success": True}), 200