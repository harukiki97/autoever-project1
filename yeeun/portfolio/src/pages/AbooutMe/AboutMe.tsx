import { useEffect, useState } from "react";
import styles from "./AboutMe.module.css";
import { supabase } from "../../api/supabase";
import type { AdminProfile } from "../../types";

const AboutMe = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("admin_profiles").select("*");

      if (error) {
        console.log("error: ", error);
      } else {
        setProfile(data?.[0] || null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.aboutMe}>
      {profile && (
        <>
          <div className={styles.profileContainer}>
            <img
              src={profile.profile_img || "/profile.jpg"}
              alt="Profile"
              className={styles.profileImage}
              referrerPolicy="no-referrer"
            />
            <div className={styles.profileInfo}>
              <p className={styles.name}>{profile.name}</p>
              <p className={styles.role}>Full-stack Developer</p>
            </div>
          </div>
          {/* <p>{profile.bio}</p> */}
          {/* 디자인 수정 후 다시 db 데이터 연결 */}
          <p className={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            orci quam, malesuada nec faucibus scelerisque, laoreet nec eros.
            Cras interdum ut nisl ac fringilla. Suspendisse vel mattis est.
            Fusce eu enim vitae neque elementum pharetra. Aliquam ante ipsum,
            mollis in diam id, iaculis tempus dui. Proin pharetra mi tortor, et
            varius justo molestie id. Etiam malesuada nisi id condimentum
            bibendum.
          </p>
          <p className={styles.bio}>
            Quisque scelerisque vulputate pharetra. Praesent nec luctus tortor,
            ut dictum quam. Fusce risus nisi, vulputate ut gravida vel, ornare
            nec urna. Curabitur laoreet molestie orci sit amet tempor. Aenean
            sed tellus porta, pretium magna eu, fermentum dolor. Maecenas sed
            ligula blandit, ornare odio et, lobortis turpis. Maecenas vitae
            iaculis sem, vitae rutrum dui. Etiam aliquam, orci nec iaculis
            imperdiet, massa elit maximus velit, a egestas quam sem ut nunc.
          </p>
        </>
      )}
    </div>
  );
};

export default AboutMe;
