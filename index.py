from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template ("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/contacto')
def contacto():
    return render_template("contacto.html")

@app.route('/cursos')
def cursos():
    return render_template("cursos.html")


if __name__ == '__main__':
   app.run(debug=True)
